import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (to, first_name) => {
    const mailOptions = {
        from: `"Eventra" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Welcome to Eventra 🎉',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#1A1A2E;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1A2E;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                            <!-- Header -->
                            <tr>
                                <td style="background:linear-gradient(135deg,#6C63FF 0%,#5548C8 100%);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
                                    <div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.3);">
                                        <span style="font-size:36px;">🏆</span>
                                    </div>
                                    <h1 style="color:#ffffff;margin:0;font-size:32px;font-weight:800;letter-spacing:2px;">EVENTRA</h1>
                                    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;letter-spacing:3px;text-transform:uppercase;">Play. Host. Discover.</p>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="background-color:#0F0E17;padding:40px;border-left:1px solid rgba(108,99,255,0.2);border-right:1px solid rgba(108,99,255,0.2);">
                                    <h2 style="color:#FFFFFE;font-size:24px;font-weight:700;margin:0 0 12px;">
                                        Welcome aboard, ${first_name}! 👋
                                    </h2>
                                    <p style="color:#A7A9BE;font-size:15px;line-height:1.8;margin:0 0 28px;">
                                        Your account has been created successfully. You're now part of the Eventra community — where athletes, organizers, and sports lovers come together.
                                    </p>

                                    <!-- Feature cards -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                                        <tr>
                                            <td style="padding:4px;">
                                                <div style="background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.25);border-radius:12px;padding:16px 20px;display:flex;align-items:center;">
                                                    <span style="font-size:22px;margin-right:14px;">🗺️</span>
                                                    <div>
                                                        <p style="color:#FFFFFE;font-weight:700;margin:0 0 2px;font-size:14px;">Discover Events</p>
                                                        <p style="color:#A7A9BE;margin:0;font-size:13px;">Find sports events near you on the live map</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr><td style="height:8px;"></td></tr>
                                        <tr>
                                            <td style="padding:4px;">
                                                <div style="background:rgba(255,101,132,0.08);border:1px solid rgba(255,101,132,0.2);border-radius:12px;padding:16px 20px;">
                                                    <span style="font-size:22px;margin-right:14px;">🏅</span>
                                                    <div style="display:inline-block;vertical-align:top;">
                                                        <p style="color:#FFFFFE;font-weight:700;margin:0 0 2px;font-size:14px;">Host Events</p>
                                                        <p style="color:#A7A9BE;margin:0;font-size:13px;">Create and manage your own sports events</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr><td style="height:8px;"></td></tr>
                                        <tr>
                                            <td style="padding:4px;">
                                                <div style="background:rgba(22,244,208,0.06);border:1px solid rgba(22,244,208,0.2);border-radius:12px;padding:16px 20px;">
                                                    <span style="font-size:22px;margin-right:14px;">👥</span>
                                                    <div style="display:inline-block;vertical-align:top;">
                                                        <p style="color:#FFFFFE;font-weight:700;margin:0 0 2px;font-size:14px;">Connect</p>
                                                        <p style="color:#A7A9BE;margin:0;font-size:13px;">Meet athletes and organizers in your area</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center">
                                                <a href="https://eventra-18by.onrender.com"
                                                   style="display:inline-block;background:linear-gradient(135deg,#6C63FF 0%,#5548C8 100%);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-weight:700;font-size:15px;letter-spacing:0.5px;box-shadow:0 6px 20px rgba(108,99,255,0.4);">
                                                    Explore Events →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background-color:#0A0914;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border:1px solid rgba(108,99,255,0.15);border-top:1px solid rgba(108,99,255,0.2);">
                                    <p style="color:#6b7280;font-size:12px;margin:0 0 6px;">
                                        You received this email because you created an account on Eventra.
                                    </p>
                                    <p style="color:#6b7280;font-size:12px;margin:0;">
                                        © ${new Date().getFullYear()} Eventra. All rights reserved.
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export default { sendWelcomeEmail };
