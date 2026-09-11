// src/utils/sendContactEmail.js
import nodemailer from 'nodemailer';

const sendContactEmail = async (contactType, data = {}) => {
    const adminEmail = (process.env.CONTACT_EMAIL || "workindicreed@gmail.com").trim();
    const brevoApiKey = (process.env.BREVO_API_KEY || '').trim();
    const brevoSenderEmail = (process.env.BREVO_EMAIL_USER || process.env.EMAIL_USER || '').trim();

    const gmailUser = (process.env.EMAIL_USER || process.env.GMAIL_USER || '').trim();
    const gmailPass = (process.env.EMAIL_PASS || process.env.GMAIL_APP_PASS || '').trim();

    const isMeet = contactType === 'meet';
    const clientName = data.name || 'Not provided';
    const clientEmail = data.email || '';

    let subject = isMeet 
        ? `📅 New Meeting Request: ${clientName} (${data.date || 'Date TBD'} at ${data.time || 'Time TBD'})`
        : `📩 New Work / Contact Enquiry: ${clientName}`;

    let htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="background: #0f172a; padding: 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">INDICREED</h1>
                <p style="color: #3b82f6; margin: 6px 0 0 0; font-size: 14px; font-weight: 600;">
                    ${isMeet ? '📅 New Meeting Schedule Request' : '📩 New Client Enquiry / Work Request'}
                </p>
            </div>
            <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600;">Type:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-transform: uppercase;">${contactType}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600;">Client Name:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${clientName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600;">Client Email:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">
                            ${clientEmail ? `<a href="mailto:${clientEmail}" style="color: #2563eb; text-decoration: none;">${clientEmail}</a>` : 'Not provided'}
                        </td>
                    </tr>
                    ${data.date ? `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600;">Preferred Date:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${data.date}</td>
                    </tr>` : ''}
                    ${data.time ? `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600;">Preferred Time:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${data.time}</td>
                    </tr>` : ''}
                    ${data.topic ? `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600;">Topic / Scope:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${data.topic}</td>
                    </tr>` : ''}
                    ${data.message ? `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 600; vertical-align: top;">Message / Details:</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; line-height: 1.5;">${data.message}</td>
                    </tr>` : ''}
                </table>

                ${clientEmail ? `
                <div style="margin-top: 24px; text-align: center;">
                    <a href="mailto:${clientEmail}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to Client (${clientEmail})</a>
                </div>` : ''}
            </div>
            <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
                Sent automatically from Indicreed Website
            </div>
        </div>
    `;

    // 1. Primary: Use Brevo API if configured
    if (brevoApiKey && brevoSenderEmail) {
        try {
            const brevoPayload = {
                sender: {
                    name: "Indicreed Website",
                    email: brevoSenderEmail
                },
                to: [{ email: adminEmail }],
                subject: subject,
                htmlContent: htmlContent,
                ...(clientEmail ? { replyTo: { email: clientEmail, name: clientName } } : {})
            };

            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "api-key": brevoApiKey
                },
                body: JSON.stringify(brevoPayload)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error("Brevo contact email failed:", errData);
                throw new Error(`Brevo Error: ${errData.message || response.statusText}`);
            }

            console.log("✅ Admin notification email sent successfully via Brevo API!");
            return true;
        } catch (brevoErr) {
            console.warn("⚠️ Brevo sending failed, attempting Gmail SMTP fallback...", brevoErr.message);
        }
    }

    // 2. Fallback: Use Nodemailer Gmail SMTP if configured
    if (gmailUser && gmailPass) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailPass
                }
            });

            const mailOptions = {
                from: `"Indicreed Notifications" <${gmailUser}>`,
                to: adminEmail,
                subject: subject,
                html: htmlContent,
                ...(clientEmail ? { replyTo: clientEmail } : {})
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("✅ Admin notification email sent successfully via Gmail SMTP:", info.messageId);
            return true;
        } catch (smtpErr) {
            console.error("❌ Gmail SMTP failed:", smtpErr.message);
            throw smtpErr;
        }
    }

    console.warn("⚠️ Neither BREVO_API_KEY nor EMAIL_PASS is fully configured in .env. Skipping notification email.");
    return false;
};

export default sendContactEmail;
