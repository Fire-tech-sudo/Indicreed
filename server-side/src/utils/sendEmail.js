// src/utils/sendEmail.js

const sendOtpEmail = async (email, otp) => {
    // ✅ Environment variables check - crash se bachao
    if (!process.env.BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY environment variable is not set");
    }
    if (!process.env.EMAIL_USER) {
        throw new Error("EMAIL_USER environment variable is not set");
    }
    if (!email || !otp) {
        throw new Error("Email and OTP are required");
    }

    const url = "https://api.brevo.com/v3/smtp/email";

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY.trim(),
        },
        body: JSON.stringify({
            sender: {
                name: "Indicreed Studio", // ← Apna naam
                email: process.env.EMAIL_USER.trim(),
            },
            to: [{ email: email }],
            subject: "Your OTP - Indicreed Studio",
            htmlContent: `
        <div style="background-color: #0b0f19; color: #e2e8f0; 
                    font-family: 'Courier New', Courier, monospace; 
                    max-width: 500px; margin: 0 auto; padding: 30px; 
                    border: 2px solid #3357e8; border-radius: 10px; 
                    text-align: center;">
          
          <h2 style="color: #3357e8; letter-spacing: 2px;">
            INDICREED STUDIO
          </h2>
          
          <p style="color: #94a3b8; font-size: 14px;">
            Email Verification Code
          </p>
          
          <div style="background: rgba(51,87,232,0.1); border: 1px dashed #3357e8; 
                      padding: 20px; margin: 25px 0; border-radius: 5px;">
            <h1 style="color: #3357e8; font-size: 40px; letter-spacing: 10px; 
                       margin: 0; font-family: monospace;">
              ${otp}
            </h1>
          </div>
          
          <p style="color: #64748b; font-size: 12px;">
            ⚠️ This OTP expires in <strong style="color: #f59e0b;">5 minutes</strong>
          </p>
          <p style="color: #64748b; font-size: 12px;">
            ❌ Do not share this code with anyone
          </p>
          
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;">
          
          <p style="color: #475569; font-size: 11px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
        }),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Brevo API Error:", errorData);
            throw new Error(`Brevo Error: ${errorData.message}`);
        }

        console.log("✅ Email sent successfully!");
        return true;
    } catch (error) {
        console.error("❌ Email Sending Failed:", error);
        throw error;
    }
};

export default sendOtpEmail;
