import nodemailer from 'nodemailer';

const otpEmailHtml = (otp) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:40px;">
        <tr><td align="center" style="padding-bottom:32px;">
          <p style="font-size:20px;font-weight:600;color:#ffffff;margin:0 0 16px;">MarketPlace</p>
          <h1 style="font-size:22px;font-weight:600;color:#ffffff;margin:0 0 8px;">Verify your account</h1>
          <p style="font-size:14px;color:#737373;margin:0;">Use the code below to complete your <span style="color:#FCD34D;font-weight:600;">sign in</span></p>
        </td></tr>

        <tr><td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;text-align:center;">
          <p style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Your one-time password</p>
          <div style="display:inline-block;">
            ${`
              <span style="display:inline-block;width:44px;height:52px;background:rgba(252,211,77,0.08);border:1px solid rgba(252,211,77,0.3);border-radius:8px;font-size:24px;font-weight:700;color:#FCD34D;line-height:52px;text-align:center;margin:0 4px;">${otp}</span>
            `}
          </div>
          <p style="font-size:12px;color:#525252;margin:16px 0 0;">Expires in <span style="color:#FCD34D;">10 minutes</span></p>
        </td></tr>

        <tr><td style="padding-top:20px;text-align:center;">
          <p style="font-size:12px;color:#525252;margin:0 0 8px;">Didn't request this? You can safely ignore this email.</p>
          <p style="font-size:12px;color:#525252;margin:0;">Having trouble? <span style="color:#FCD34D;">Contact support</span></p>
        </td></tr>
      </table>
      <p style="font-size:11px;color:#3a3a3a;margin-top:20px;">MarketPlace &bull; Automated message, do not reply</p>
    </td></tr>
  </table>
</body>
</html>
`;

const sendEmail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your MarketPlace verification code',
      html: otpEmailHtml(otp),
    });
    console.log('Message sent: %s', info.messageId);
    return { success: true, message: 'otp sent successfully' };
  } catch (err) {
    console.error('Error while sending mail:', err);
    return { success: false, message: 'couldnt send otp please try again' };
  }
};

export default sendEmail;
