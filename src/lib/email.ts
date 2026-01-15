import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadNotificationData {
  name: string;
  company: string;
  email: string;
  problemType: string;
  budgetRange?: string;
  timeline: string;
  message: string;
}

export async function sendLeadNotification(data: LeadNotificationData) {
  const adminEmail = process.env.ADMIN_EMAIL || "hello@cloudrix.io";

  try {
    await resend.emails.send({
      from: "Cloudrix Website <noreply@cloudrix.io>",
      to: adminEmail,
      subject: `New Lead: ${data.company} - ${data.problemType}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Problem Type</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.problemType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.budgetRange || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Timeline</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.timeline}</td>
          </tr>
        </table>
        <h3>Message</h3>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Sent from Cloudrix website contact form
        </p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
    return { success: false, error };
  }
}

export async function sendThankYouEmail(data: { name: string; email: string }) {
  try {
    await resend.emails.send({
      from: "Cloudrix <hello@cloudrix.io>",
      to: data.email,
      subject: "Thank you for contacting Cloudrix",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Thank you for reaching out, ${data.name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            We've received your message and will get back to you within 24 hours during EU business days.
          </p>
          <p style="color: #475569; line-height: 1.6;">
            In the meantime, feel free to:
          </p>
          <ul style="color: #475569; line-height: 1.8;">
            <li>Check out our <a href="https://cloudrix.io/case-studies" style="color: #2563eb;">case studies</a></li>
            <li>Learn more about <a href="https://cloudrix.io/how-we-work" style="color: #2563eb;">how we work</a></li>
            <li>Explore our <a href="https://cloudrix.io/services" style="color: #2563eb;">services</a></li>
          </ul>
          <p style="color: #475569; line-height: 1.6;">
            Looking forward to speaking with you soon!
          </p>
          <p style="color: #475569; margin-top: 30px;">
            Best regards,<br />
            <strong>The Cloudrix Team</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Cloudrix - Software Engineering for EU Companies<br />
            <a href="https://cloudrix.io" style="color: #94a3b8;">cloudrix.io</a>
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send thank you email:", error);
    return { success: false, error };
  }
}
