import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ServiceRequestPayload = {
  selectedService?: string;
  companyName?: string;
  companyRnc?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialHandle?: string;
  brandDescription?: string;
  servicesOffered?: string;
  interests?: string[];
  otherInterest?: string;
  currentProblem?: string;
  needsSocialPlan?: boolean;
  socialPlan?: string;
  socialPlanOther?: string;
  budget?: string;
  budgetOther?: string;
  source?: string;
  website?: string;
};

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const asStringArray = (value: unknown) => (Array.isArray(value) ? value.map(asString).filter(Boolean) : []);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const textFieldMaxLength = {
  selectedService: 120,
  companyName: 120,
  companyRnc: 40,
  contactEmail: 160,
  contactPhone: 40,
  socialHandle: 120,
  brandDescription: 1500,
  servicesOffered: 1200,
  otherInterest: 120,
  currentProblem: 1500,
  socialPlan: 120,
  socialPlanOther: 120,
  budget: 64,
  budgetOther: 64,
  source: 120,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
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
      if (value.resetAt <= now) {
        rateLimitStore.delete(key);
      }
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

    const payload = (await request.json()) as ServiceRequestPayload;
    const honeypot = asString(payload.website);
    if (honeypot) {
      // Silent success for bots.
      return NextResponse.json({ ok: true });
    }

    const data = {
      selectedService: asString(payload.selectedService),
      companyName: asString(payload.companyName),
      companyRnc: asString(payload.companyRnc),
      contactEmail: asString(payload.contactEmail),
      contactPhone: asString(payload.contactPhone),
      socialHandle: asString(payload.socialHandle),
      brandDescription: asString(payload.brandDescription),
      servicesOffered: asString(payload.servicesOffered),
      interests: asStringArray(payload.interests),
      otherInterest: asString(payload.otherInterest),
      currentProblem: asString(payload.currentProblem),
      needsSocialPlan: Boolean(payload.needsSocialPlan),
      socialPlan: asString(payload.socialPlan),
      socialPlanOther: asString(payload.socialPlanOther),
      budget: asString(payload.budget),
      budgetOther: asString(payload.budgetOther),
      source: asString(payload.source),
    };

    const invalidLengthField = (Object.entries(textFieldMaxLength) as Array<
      [keyof typeof textFieldMaxLength, number]
    >).find(([field, maxLength]) => data[field].length > maxLength);

    if (invalidLengthField) {
      return NextResponse.json(
        { ok: false, error: "field_too_long", field: invalidLengthField[0] },
        { status: 400 },
      );
    }

    if (data.interests.length > 12 || data.interests.some((item) => item.length > 100)) {
      return NextResponse.json({ ok: false, error: "invalid_interests" }, { status: 400 });
    }

    const requiredFields = [
      "companyName",
      "companyRnc",
      "contactEmail",
      "contactPhone",
      "socialHandle",
      "brandDescription",
      "currentProblem",
      "source",
    ] as const;
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({ ok: false, error: "missing_fields", fields: missingFields }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(data.contactEmail)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    if (!data.interests.length && !data.otherInterest) {
      return NextResponse.json({ ok: false, error: "missing_interests" }, { status: 400 });
    }

    if (data.needsSocialPlan && !data.socialPlan && !data.socialPlanOther) {
      return NextResponse.json({ ok: false, error: "missing_social_plan" }, { status: 400 });
    }

    if (!data.budget && !data.budgetOther) {
      return NextResponse.json({ ok: false, error: "missing_budget" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM;
    const emailTo = process.env.EMAIL_TO;

    const missingEnv = [
      ["SMTP_HOST", smtpHost],
      ["SMTP_PORT", smtpPort],
      ["SMTP_USER", smtpUser],
      ["SMTP_PASS", smtpPass],
      ["EMAIL_FROM", emailFrom],
      ["EMAIL_TO", emailTo],
    ].filter(([, value]) => !value);

    if (missingEnv.length > 0) {
      console.error("Missing email env vars:", missingEnv.map(([name]) => name).join(", "));
      return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
    }

    const portNumber = Number(smtpPort);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: portNumber,
      secure: portNumber === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const interestSummary = [...data.interests, data.otherInterest].filter(Boolean).join(", ") || "-";
    const socialPlanSummary = [data.socialPlan, data.socialPlanOther].filter(Boolean).join(" / ") || "-";
    const budgetSummary = [data.budget, data.budgetOther].filter(Boolean).join(" / ") || "-";

    const lines: string[] = [];
    const pushLine = (label: string, value: string) => {
      lines.push(`${label}: ${value || "-"}`);
    };

    pushLine("Servicio Seleccionado", data.selectedService);
    pushLine("Empresa", data.companyName);
    pushLine("RNC", data.companyRnc);
    pushLine("Email", data.contactEmail);
    pushLine("Telefono", data.contactPhone);
    pushLine("Usuario Social", data.socialHandle);
    pushLine("Descripcion de Marca", data.brandDescription);
    pushLine("Servicios Ofrecidos", data.servicesOffered);
    pushLine("Servicios de Interes", interestSummary);
    pushLine("Problema Actual", data.currentProblem);
    pushLine("Plan Redes Sociales", data.needsSocialPlan ? socialPlanSummary : "-");
    pushLine("Presupuesto", budgetSummary);
    pushLine("Como se Entero", data.source);

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2>Nueva Solicitud de Servicio</h2>
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

    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      replyTo: data.contactEmail || undefined,
      subject: `Nueva Solicitud de Servicio: ${data.selectedService || "Servicio"}`,
      text: lines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fallo al enviar el correo de solicitud de servicio:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
