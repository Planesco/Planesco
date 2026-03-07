import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@planesco.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, subject } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const emailSubject =
      subject && String(subject).trim()
        ? `[PLANESCO] ${String(subject).trim()}`
        : "Contact from PLANESCO";

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(String(phone).trim())}</p>` : ""}
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(String(subject).trim())}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${escapeHtml(message.trim())}</pre>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
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
