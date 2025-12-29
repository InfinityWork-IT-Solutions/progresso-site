import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
}

async function sendContactEmail(data: ContactFormData): Promise<void> {
  const {
    BREVO_API_KEY,
    BREVO_SENDER_EMAIL,
    BREVO_SENDER_NAME = "Progreso Consultants",
    CONTACT_EMAIL,
  } = process.env;

  console.log("Env check:", {
    hasApiKey: !!BREVO_API_KEY,
    senderEmail: BREVO_SENDER_EMAIL,
    contactEmail: CONTACT_EMAIL
  });

  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !CONTACT_EMAIL) {
    throw new Error(
      "Email configuration missing. Please set BREVO_API_KEY, BREVO_SENDER_EMAIL, and CONTACT_EMAIL environment variables in Netlify."
    );
  }

  const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";

  // Email to business owner
  const notificationEmail = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },
    to: [
      {
        email: CONTACT_EMAIL,
        name: "Progreso Consultants",
      },
    ],
    replyTo: {
      email: data.email,
      name: data.name,
    },
    subject: `New Discovery Call Request from ${data.name}`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Discovery Call Request</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          <p><strong>Company:</strong> ${data.company}</p>
          ${data.message ? `<p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This email was sent from the Progreso Consultants website contact form.
        </p>
      </div>
    `,
  };

  // Confirmation email to user
  const confirmationEmail = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },
    to: [
      {
        email: data.email,
        name: data.name,
      },
    ],
    subject: "Thank you for your interest - Progreso Consultants",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Thank you for reaching out!</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your interest in Progreso Consultants. We have received your discovery call request and will be in touch shortly to schedule your session.</p>
        <p>In the meantime, if you have any urgent questions, please feel free to contact us directly at:</p>
        <ul style="list-style: none; padding: 0;">
          <li>Email: <a href="mailto:jody@progreso.consulting">jody@progreso.consulting</a></li>
          <li>Phone: 078 584 3558</li>
        </ul>
        <p style="margin-top: 30px;">Best regards,<br><strong>The Progreso Consultants Team</strong></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 12px;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
      </div>
    `,
  };

  try {
    // Send notification email to business owner
    const notificationResponse = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(notificationEmail),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.json();
      throw new Error(`Brevo API error: ${JSON.stringify(errorData)}`);
    }

    // Send confirmation email to user
    const confirmationResponse = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(confirmationEmail),
    });

    if (!confirmationResponse.ok) {
      const errorData = await confirmationResponse.json();
      throw new Error(`Brevo API error: ${JSON.stringify(errorData)}`);
    }
  } catch (error: any) {
    const errorMessage = error.message || "Unknown error";
    console.error("Email error:", {
      message: errorMessage,
      stack: error.stack,
    });

    throw new Error(`Email sending failed: ${errorMessage}`);
  }
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const { name, email, phone, company, message } = JSON.parse(
      event.body || "{}"
    );

    // Validate required fields
    if (!name || !email || !phone || !company) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Name, email, phone, and company are required fields.",
        }),
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Please provide a valid email address.",
        }),
      };
    }

    // Send email
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      message: message?.trim() || undefined,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Thank you! We'll be in touch shortly.",
      }),
    };
  } catch (error: any) {
    console.error("Contact form error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Failed to send your message. Please try again later or contact us directly.",
        error: process.env.NETLIFY_DEV ? error.message : undefined,
      }),
    };
  }
};
