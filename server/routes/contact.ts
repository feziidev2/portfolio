import type { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  message: z.string().min(1, "Message is required"),
});

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM ?? CONTACT_EMAIL_TO;
const CONTACT_EMAIL_PASSWORD = process.env.CONTACT_EMAIL_PASSWORD;

if (!CONTACT_EMAIL_TO || !CONTACT_EMAIL_PASSWORD) {
  console.warn("Contact form email environment variables are not fully configured.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: CONTACT_EMAIL_FROM,
    pass: CONTACT_EMAIL_PASSWORD,
  },
});

export const handleContact: RequestHandler = async (req, res) => {
  const parseResult = contactSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid form submission",
      issues: parseResult.error.flatten().fieldErrors,
    });
  }

  if (!CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM || !CONTACT_EMAIL_PASSWORD) {
    return res.status(500).json({
      success: false,
      message: "Contact form email service is not configured.",
    });
  }

  const { name, email, message } = parseResult.data;

  try {
    await transporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    res.json({ success: true, message: "Message sent" });
  } catch (error) {
    console.error("Failed to send contact email", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
