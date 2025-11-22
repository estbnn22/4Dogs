"use server";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { ok: false, error: "All fields are required" };
  }

  try {
    await resend.emails.send({
      from: "4Dogs Contact <onboarding@resend.dev>",
      to: "toymachuca@hotmail.com", // test mode
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Failed to send message." };
  }
}
