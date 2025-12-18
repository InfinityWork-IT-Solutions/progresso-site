import nodemailer from "nodemailer";
import { log } from "./index";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const {
    SMTP_HOST = "smtp.gmail.com",
    SMTP_PORT = "587",
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_EMAIL,
  } = process.env;

  log(`Email config check - SMTP_USER: ${SMTP_USER ? 'SET' : 'MISSING'}, SMTP_PASSWORD: ${SMTP_PASSWORD ? 'SET' : 'MISSING'}, CONTACT_EMAIL: ${CONTACT_EMAIL || 'MISSING'}`, "email");

  if (!SMTP_USER || !SMTP_PASSWORD || !CONTACT_EMAIL) {
    throw new Error(
      "Email configuration missing. Please set SMTP_USER, SMTP_PASSWORD, and CONTACT_EMAIL environment variables."
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD, // App password from Gmail
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  // Verify connection (only once, not on every email send)
  // We'll verify when actually sending instead

  // Email to business owner
  const mailOptions = {
    from: `"Progreso Website" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: `New Discovery Call Request from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Discovery Call Request</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          ${data.message ? `<p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This email was sent from the Progreso Consultants website contact form.
        </p>
      </div>
    `,
    text: `
New Discovery Call Request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.message ? `Message: ${data.message}` : ''}

This email was sent from the Progreso Consultants website contact form.
    `.trim(),
  };

  // Confirmation email to user
  const confirmationMailOptions = {
    from: `"Progreso Consultants" <${SMTP_USER}>`,
    to: data.email,
    subject: "Thank you for your interest - Progreso Consultants",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Thank you for reaching out!</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your interest in Progreso Consultants. We have received your discovery call request and will be in touch shortly to schedule your session.</p>
        <p>In the meantime, if you have any urgent questions, please feel free to contact us directly at:</p>
        <ul style="list-style: none; padding: 0;">
          <li>📧 Email: <a href="mailto:jody@progreso.consulting">jody@progreso.consulting</a></li>
          <li>📞 Phone: 078 584 3558</li>
        </ul>
        <p style="margin-top: 30px;">Best regards,<br><strong>The Progreso Consultants Team</strong></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 12px;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
      </div>
    `,
    text: `
Thank you for reaching out!

Dear ${data.name},

Thank you for your interest in Progreso Consultants. We have received your discovery call request and will be in touch shortly to schedule your session.

In the meantime, if you have any urgent questions, please feel free to contact us directly at:
- Email: jody@progreso.consulting
- Phone: 078 584 3558

Best regards,
The Progreso Consultants Team

---
This is an automated confirmation email. Please do not reply to this message.
    `.trim(),
  };

  try {
    // Verify connection first
    log("Verifying SMTP connection...", "email");
    await transporter.verify();
    log("SMTP connection verified successfully", "email");
    
    // Send notification email first
    log("Sending notification email...", "email");
    await transporter.sendMail(mailOptions);
    log("Notification email sent", "email");
    
    // Send confirmation email
    log("Sending confirmation email...", "email");
    await transporter.sendMail(confirmationMailOptions);
    log("Confirmation email sent", "email");

    log(`Contact form email sent successfully from ${data.name} (${data.email})`);
  } catch (error: any) {
    const errorCode = error.code || "";
    const errorCommand = error.command || "";
    const errorResponse = error.response || "";
    const errorMessage = error.message || "Unknown error";
    
    log(`Failed to send contact form email: ${errorMessage}`, "email-error");
    if (errorCode) log(`Error code: ${errorCode}`, "email-error");
    if (errorCommand) log(`Error command: ${errorCommand}`, "email-error");
    if (errorResponse) log(`Error response: ${JSON.stringify(errorResponse)}`, "email-error");
    
    console.error("Full email error object:", {
      message: errorMessage,
      code: errorCode,
      command: errorCommand,
      response: errorResponse,
      stack: error.stack,
    });
    
    // Provide more helpful error messages
    if (errorCode === "EAUTH") {
      throw new Error("Email authentication failed. Please check your email and app password.");
    } else if (errorCode === "ECONNECTION" || errorCode === "ETIMEDOUT") {
      throw new Error("Could not connect to email server. Please check your SMTP settings.");
    } else {
      throw new Error(`Email sending failed: ${errorMessage}${errorCode ? ` (${errorCode})` : ''}`);
    }
  }
}

