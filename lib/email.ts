// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ConfirmationEmailInput = {
  to: string;
  ownerName: string;
  dogName: string;
  scheduledAt: Date;
  totalPriceCents: number;
};

type AdminNewAppointmentEmailInput = {
  ownerName: string;
  dogName: string;
  dogBreed: string | null;
  scheduledAt: Date;
  totalPriceCents: number;
  appointmentId: string;
  userEmail: string | null;
};

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDateTime(date: Date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function sendAppointmentConfirmationEmail(
  data: ConfirmationEmailInput
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set; skipping email send.");
    return;
  }

   console.log("[EMAIL] Sending confirmation to:", data.to);

  try {
    const { to, ownerName, dogName, scheduledAt, totalPriceCents } = data;

    console.log("[EMAIL] Sending confirmation to:", to);

    const result = await resend.emails.send({
      from: "4Dogs Grooming <no-reply@4dogsgrooming.org>",
      to,
      subject: `Appointment confirmed for ${dogName}`,
      html: `
        <h2>Hi ${ownerName},</h2>
        <p>Thank you for booking with 4Dogs Grooming! 🐾</p>
        <p>Appointment details:</p>
        <ul>
          <li><strong>Dog:</strong> ${dogName}</li>
          <li><strong>Date & Time:</strong> ${formatDateTime(scheduledAt)}</li>
          <li><strong>Estimated Total:</strong> ${formatPrice(
            totalPriceCents
          )}</li>
        </ul>
        <p>You can view your bookings at <a href="https://www.4dogsgrooming.org/myAppts">My Appointments</a>.</p>
        <p>– 4Dogs Grooming</p>
      `,
    });

    console.log("[EMAIL] Resend result:", result);
  } catch (err) {
    console.error("[EMAIL] Failed to send confirmation", err);
  }
}

//Admin appt email
// TODO: add admin email

export async function sendAdminNewAppointmentEmail(
  data: AdminNewAppointmentEmailInput
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set; skipping admin email.");
    return;
  }

  // While you're in Resend test mode, this MUST be your own email.
  const adminEmail = process.env.ADMIN_EMAIL || "toymachuca@hotmail.com"; 

  const {
    ownerName,
    dogName,
    dogBreed,
    scheduledAt,
    totalPriceCents,
    appointmentId,
    userEmail,
  } = data;

  await resend.emails.send({
    from: "4Dogs Alerts <no-reply@4dogsgrooming.org>", // later: use your own domain email
    to: adminEmail,
    subject: `🆕 New appointment booked for ${dogName}`,
    html: `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #111827;">
        <h2 style="margin-bottom: 8px;">New Appointment Booked</h2>
        <p>A new appointment has just been scheduled.</p>

        <h3 style="margin: 16px 0 4px;">Details</h3>
        <ul>
          <li><strong>Owner:</strong> ${ownerName}</li>
          <li><strong>Dog:</strong> ${dogName}${
      dogBreed ? ` (${dogBreed})` : ""
    }</li>
          <li><strong>Date & Time:</strong> ${formatDateTime(scheduledAt)}</li>
          <li><strong>Estimated Total:</strong> ${formatPrice(
            totalPriceCents
          )}</li>
          ${
            userEmail
              ? `<li><strong>User Email:</strong> ${userEmail}</li>`
              : ""
          }
          <li><strong>Appointment ID:</strong> ${appointmentId}</li>
        </ul>

        <p style="margin-top: 16px;">
          You can manage this appointment in the admin dashboard:<br/>
          <a href="https://www.4dogsgrooming.org/admin" style="color: #b45309; text-decoration: underline;">
            Go to Admin · Appointments
          </a>
        </p>
      </div>
    `,
  });
}
