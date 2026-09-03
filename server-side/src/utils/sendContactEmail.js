// src/utils/sendContactEmail.js
import nodemailer from 'nodemailer';

const sendContactEmail = async (contactType, data) => {
    // Requires EMAIL_USER (e.g. your gmail) and EMAIL_PASS (App Password)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Missing EMAIL_USER or EMAIL_PASS in .env, skipping email notification.");
        return;
    }

    // Default admin email to receive notifications
    const adminEmail = process.env.CONTACT_EMAIL || "workindicreed@gmail.com"; 

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER.trim(),
            pass: process.env.EMAIL_PASS.trim()
        }
    });

    let subject = `New Contact Enquiry: ${contactType.toUpperCase()}`;
    let htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
            <h2 style="color: #3357e8;">New Enquiry Received</h2>
            <p><strong>Type:</strong> ${contactType}</p>
            <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
            <p><strong>User's Email:</strong> ${data.email || 'N/A'}</p>
            <p><strong>Details:</strong></p>
            <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${JSON.stringify(data, null, 2)}</pre>
        </div>
    `;

    const mailOptions = {
        from: `"Indicreed Website" <${process.env.EMAIL_USER.trim()}>`,
        to: adminEmail,
        subject: subject,
        html: htmlContent,
        replyTo: data.email // This allows you to directly reply to the user's email
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Admin notification email sent successfully via Gmail:", info.messageId);
        return true;
    } catch (error) {
        console.error("Failed to send email via Gmail:", error);
        throw error;
    }
};

export default sendContactEmail;
