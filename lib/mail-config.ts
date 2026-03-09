import nodemailer from "nodemailer";

type MailConfigResult =
  | {
      ok: true;
      transporter: nodemailer.Transporter;
      from: string;
      to: string;
      mode: "gmail" | "custom";
    }
  | {
      ok: false;
      missing: string[];
    };

const DEFAULT_GMAIL_USER = "engagencyrd@gmail.com";
const DEFAULT_FROM_NAME = "Engage Agency";

function getEnv(name: string) {
  return process.env[name]?.trim() || "";
}

function buildFrom(fromName: string, userEmail: string) {
  return `${fromName} <${userEmail}>`;
}

export function resolveMailConfig(): MailConfigResult {
  const smtpHost = getEnv("SMTP_HOST");
  const smtpPort = getEnv("SMTP_PORT");
  const smtpUser = getEnv("SMTP_USER");
  const smtpPass = getEnv("SMTP_PASS");
  const emailFrom = getEnv("EMAIL_FROM");
  const emailTo = getEnv("EMAIL_TO");

  const hasCustomSmtp = Boolean(smtpHost || smtpPort || smtpUser || smtpPass);

  if (hasCustomSmtp) {
    const missing = [
      ["SMTP_HOST", smtpHost],
      ["SMTP_PORT", smtpPort],
      ["SMTP_USER", smtpUser],
      ["SMTP_PASS", smtpPass],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missing.length > 0) {
      return { ok: false, missing };
    }

    const resolvedFrom = emailFrom || buildFrom(DEFAULT_FROM_NAME, smtpUser);
    const resolvedTo = emailTo || smtpUser;

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

    return {
      ok: true,
      transporter,
      from: resolvedFrom,
      to: resolvedTo,
      mode: "custom",
    };
  }

  const gmailUser = getEnv("GMAIL_USER") || DEFAULT_GMAIL_USER;
  const gmailAppPassword = getEnv("GMAIL_APP_PASSWORD");
  const leadsEmail = getEnv("LEADS_EMAIL") || gmailUser;
  const emailFromName = getEnv("EMAIL_FROM_NAME") || DEFAULT_FROM_NAME;
  const from = getEnv("EMAIL_FROM") || buildFrom(emailFromName, gmailUser);

  if (!gmailAppPassword) {
    return {
      ok: false,
      missing: ["GMAIL_APP_PASSWORD"],
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  return {
    ok: true,
    transporter,
    from,
    to: leadsEmail,
    mode: "gmail",
  };
}
