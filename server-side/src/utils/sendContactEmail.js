// src/utils/sendContactEmail.js
import https from 'https';

const sendContactEmail = async (contactType, data) => {
    if (!process.env.BREVO_API_KEY || !process.env.EMAIL_USER) {
        console.warn("Missing email credentials, skipping email notification.");
        return;
    }

    // Default admin email to receive notifications
    const adminEmail = process.env.EMAIL_USER || "workindicreed@gmail.com"; 

    let subject = `New Contact Enquiry: ${contactType.toUpperCase()}`;
    let htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
            <h2 style="color: #3357e8;">New Enquiry Received</h2>
            <p><strong>Type:</strong> ${contactType}</p>
            <p><strong>Details:</strong></p>
            <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${JSON.stringify(data, null, 2)}</pre>
        </div>
    `;

    const postData = JSON.stringify({
        sender: {
            name: "Indicreed Website",
            email: process.env.EMAIL_USER.trim(),
        },
        to: [{ email: adminEmail }],
        subject: subject,
        htmlContent: htmlContent,
    });

    const options = {
        hostname: 'api.brevo.com',
        port: 443,
        path: '/v3/smtp/email',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY.trim(),
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log("Admin notification email sent successfully.");
                    resolve(true);
                } else {
                    console.error("Failed to send email, Status:", res.statusCode, responseBody);
                    reject(new Error(`Email sending failed with status ${res.statusCode}`));
                }
            });
        });

        req.on('error', (e) => {
            console.error("Network Error sending admin email:", e);
            reject(e);
        });

        req.write(postData);
        req.end();
    });
};

export default sendContactEmail;
