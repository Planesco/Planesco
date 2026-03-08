import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@planesco.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_LENGTH = 50_000;

function validationError(message: string, code = "VALIDATION_ERROR") {
  return NextResponse.json({ error: message, code }, { status: 400 });
}

function serverError(message: string, code = "SERVER_ERROR") {
  return NextResponse.json({ error: message, code }, { status: 500 });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return validationError("Request must be JSON.", "INVALID_CONTENT_TYPE");
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return validationError("Invalid JSON body.", "INVALID_JSON");
    }

    if (typeof body !== "object" || body === null) {
      return validationError("Body must be an object.", "INVALID_BODY");
    }

    const { name, email, message, phone, subject } = body as Record<string, unknown>;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";

    if (!nameStr) {
      return validationError("Name is required.");
    }
    if (!emailStr) {
      return validationError("Email is required.");
    }
    if (!EMAIL_REGEX.test(emailStr)) {
      return validationError("Please enter a valid email address.", "INVALID_EMAIL");
    }
    if (!messageStr) {
      return validationError("Message is required.");
    }

    const payloadSize = JSON.stringify(body).length;
    if (payloadSize > MAX_BODY_LENGTH) {
      return validationError("Message too long.", "PAYLOAD_TOO_LARGE");
    }

    const subjectStr = subject && typeof subject === "string" ? String(subject).trim() : "";
    const phoneStr = phone && typeof phone === "string" ? String(phone).trim() : "";

    const emailSubject = subjectStr
      ? `[PLANESCO] ${escapeHtml(subjectStr)}`
      : "Contact from PLANESCO";

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
      ${phoneStr ? `<p><strong>Phone:</strong> ${escapeHtml(phoneStr)}</p>` : ""}
      ${subjectStr ? `<p><strong>Subject:</strong> ${escapeHtml(subjectStr)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${escapeHtml(messageStr)}</pre>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return serverError("Email service is not configured.", "CONFIG_ERROR");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: emailSubject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return serverError("Failed to send email. Please try again later.", "EMAIL_FAILED");
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return serverError("Something went wrong. Please try again.", "SERVER_ERROR");
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}
