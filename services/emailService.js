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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Eventra</title>
</head>
<body style="margin:0;padding:0;background-color:#1A1A2E;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1A1A2E;">
    <tr>
        <td align="center" style="padding:40px 16px;">

            <!-- Outer card -->
            <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;border-radius:16px;overflow:hidden;">

                <!-- ===== HEADER ===== -->
                <tr>
                    <td align="center" bgcolor="#6C63FF" style="background-color:#6C63FF;padding:40px 40px 32px;">

                        <!-- Trophy circle -->
                        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px;">
                            <tr>
                                <td align="center" width="72" height="72"
                                    style="width:72px;height:72px;border-radius:50%;background-color:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.35);font-size:36px;line-height:72px;text-align:center;">
                                    &#127942;
                                </td>
                            </tr>
                        </table>

                        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:3px;text-align:center;">EVENTRA</p>
                        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.8);letter-spacing:4px;text-transform:uppercase;text-align:center;">Play. Host. Discover.</p>
                    </td>
                </tr>

                <!-- ===== BODY ===== -->
                <tr>
                    <td bgcolor="#0F0E17" style="background-color:#0F0E17;padding:36px 40px 32px;border-left:1px solid #2a2a3e;border-right:1px solid #2a2a3e;">

                        <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:#FFFFFE;">
                            Welcome aboard, ${first_name}! &#128075;
                        </p>
                        <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:15px;line-height:1.8;color:#A7A9BE;">
                            Your account has been created successfully. You're now part of the Eventra community — where athletes, organizers, and sports lovers come together.
                        </p>

                        <!-- Feature 1 -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                            <tr>
                                <td style="background-color:#1e1d2e;border:1px solid #3a3660;border-radius:10px;padding:14px 18px;">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td width="36" valign="middle" style="font-size:22px;padding-right:14px;">&#128506;</td>
                                            <td valign="middle">
                                                <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#FFFFFE;">Discover Events</p>
                                                <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#A7A9BE;">Find sports events near you on the live map</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <!-- Feature 2 -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                            <tr>
                                <td style="background-color:#1e1d2e;border:1px solid #3d2a35;border-radius:10px;padding:14px 18px;">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td width="36" valign="middle" style="font-size:22px;padding-right:14px;">&#127941;</td>
                                            <td valign="middle">
                                                <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#FFFFFE;">Host Events</p>
                                                <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#A7A9BE;">Create and manage your own sports events</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <!-- Feature 3 -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                            <tr>
                                <td style="background-color:#1e1d2e;border:1px solid #1e3535;border-radius:10px;padding:14px 18px;">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td width="36" valign="middle" style="font-size:22px;padding-right:14px;">&#128101;</td>
                                            <td valign="middle">
                                                <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#FFFFFE;">Connect</p>
                                                <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#A7A9BE;">Meet athletes and organizers in your area</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td align="center" bgcolor="#6C63FF" style="background-color:#6C63FF;border-radius:10px;">
                                                <a href="https://eventra-18by.onrender.com"
                                                   style="display:inline-block;padding:14px 44px;font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.5px;">
                                                    Explore Events &rarr;
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>

                <!-- ===== FOOTER ===== -->
                <tr>
                    <td align="center" bgcolor="#0A0914" style="background-color:#0A0914;padding:22px 40px;border:1px solid #2a2a3e;border-top:1px solid #2a2a3e;border-radius:0 0 16px 16px;">
                        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;text-align:center;">
                            You received this email because you created an account on Eventra.
                        </p>
                        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;text-align:center;">
                            &copy; ${new Date().getFullYear()} Eventra. All rights reserved.
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
