import { NextResponse } from "next/server";
import { resolveMailConfig } from "@/lib/mail-config";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string;
};

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_MAX = {
  name: 120,
  email: 160,
  phone: 40,
  message: 1800,
} as const;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);

  if (rateLimitStore.size > 1000) {
    rateLimitStore.forEach((value, key) => {
      if (value.resetAt <= now) rateLimitStore.delete(key);
    });
  }

  return current.count > RATE_LIMIT_MAX_REQUESTS;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const payload = (await request.json()) as ContactPayload;
    const honeypot = asString(payload.website);
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const data = {
      name: asString(payload.name),
      email: asString(payload.email),
      phone: asString(payload.phone),
      message: asString(payload.message),
    };

    const invalidLengthField = (Object.entries(FIELD_MAX) as Array<[keyof typeof FIELD_MAX, number]>).find(
      ([field, maxLength]) => data[field].length > maxLength,
    );
    if (invalidLengthField) {
      return NextResponse.json(
        { ok: false, error: "field_too_long", field: invalidLengthField[0] },
        { status: 400 },
      );
    }

    const missingFields = (["name", "email", "phone", "message"] as const).filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({ ok: false, error: "missing_fields", fields: missingFields }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(data.email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const mailConfig = resolveMailConfig();
    if (!mailConfig.ok) {
      console.error("Missing email env vars:", mailConfig.missing.join(", "));
      return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
    }

    const lines = [
      `Nombre: ${data.name}`,
      `Email: ${data.email}`,
      `Telefono: ${data.phone}`,
      `Mensaje: ${data.message}`,
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2>Nuevo mensaje de contacto</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          ${lines
            .map((line) => {
              const [label, ...rest] = line.split(":");
              const value = rest.join(":").trim();
              return `
                <tr>
                  <td style="border-bottom: 1px solid #eee; padding: 8px 0; font-weight: 600;">${escapeHtml(label)}</td>
                  <td style="border-bottom: 1px solid #eee; padding: 8px 0;">${escapeHtml(value)}</td>
                </tr>
              `;
            })
            .join("")}
        </table>
      </div>
    `;

    await mailConfig.transporter.sendMail({
      from: mailConfig.from,
      to: mailConfig.to,
      replyTo: data.email,
      subject: `Nuevo contacto web: ${data.name}`,
      text: lines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fallo al enviar el formulario de contacto:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
