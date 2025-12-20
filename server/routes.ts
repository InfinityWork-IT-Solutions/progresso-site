import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { log } from "./index";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Test email configuration endpoint
  app.get("/api/test-email-config", async (req: Request, res: Response) => {
    const config = {
      SMTP_HOST: process.env.SMTP_HOST || "not set",
      SMTP_PORT: process.env.SMTP_PORT || "not set",
      SMTP_USER: process.env.SMTP_USER ? "SET (hidden)" : "MISSING",
      SMTP_PASSWORD: process.env.SMTP_PASSWORD ? "SET (hidden)" : "MISSING",
      CONTACT_EMAIL: process.env.CONTACT_EMAIL || "not set",
    };
    res.json({ config });
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, phone, company, message } = req.body;

      log(`Contact form submission received from ${name} (${email})`, "api");

      // Validate required fields
      if (!name || !email || !phone || !company) {
        return res.status(400).json({
          success: false,
          message: "Name, email, phone, and company are required fields.",
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address.",
        });
      }

      // Send email
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        message: message?.trim() || undefined,
      });

      res.json({
        success: true,
        message: "Thank you! We'll be in touch shortly.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error";
      const errorCode = error.code || "";
      const errorResponse = error.response || "";
      
      log(`Contact form error: ${errorMessage}`, "api-error");
      if (errorCode) log(`Error code: ${errorCode}`, "api-error");
      if (errorResponse) log(`Error response: ${JSON.stringify(errorResponse)}`, "api-error");
      
      console.error("Full error details:", {
        message: errorMessage,
        code: errorCode,
        response: errorResponse,
        stack: error.stack,
      });
      
      res.status(500).json({
        success: false,
        message: "Failed to send your message. Please try again later or contact us directly.",
        error: process.env.NODE_ENV === "development" ? `${errorMessage}${errorCode ? ` (${errorCode})` : ''}` : undefined,
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
