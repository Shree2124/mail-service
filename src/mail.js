import nodemailer from "nodemailer";
import { processBulkEmails } from "./utils/bulkEmailProcess.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendUserCredentialsMail = async ({
  email,
  name,
  username,
  password,
}) => {
  const upperName = name.toUpperCase();
  const firstName = name.split(" ")[0];

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

      <p>Dear <strong>${upperName}</strong>,</p>

      <p>
        We are excited to introduce <strong>ACADFLOW</strong>, your new one-stop platform 
        for managing your academic journey at <strong>PVPPCOE, SION</strong>.
      </p>

      <p>We’ve designed this portal to make your life easier. Starting today, you can use it to:</p>

      <ul style="line-height:1.8;">
        <li><strong>Access</strong> subject notes and practical resources.</li>
        <li><strong>Submit</strong> assignments, experiments and track deadlines.</li>
        <li><strong>Monitor</strong> your grades and feedback in real-time.</li>
      </ul>

      <p><strong>Here are your login credentials:</strong></p>

      <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:15px 0;">
        <p><strong>Portal Link:</strong> 
          <a href="https://acad-flow-pvppcoe.vercel.app/" style="color:#1a73e8; text-decoration:none;">
            ACADFLOW
          </a>
        </p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>

      <p style="background:#fff3cd; padding:10px; border-radius:6px;">
        ⚠️ <strong>Important:</strong> Please go to <strong>Settings &gt; Security</strong> 
        and change your password if you wish to.
      </p>

      <p>
        If you have any trouble logging in, please reply to this email or contact the developers.
      </p>

      <p><strong>Happy Learning!</strong></p>

      <p>
        Best regards,<br/>
        <strong>${firstName}</strong><br/>
        Team ACADFLOW, CSE PVPPCOE.
      </p>

      <hr style="margin:20px 0;" />

      <p style="font-size:12px; color:#777;">
        This is an automated message.<br/>
        For any queries reach out to us at Support or simply reply to this email.
      </p>

    </div>
  </div>
  `;

  return transporter.sendMail({
    from: `ACADFLOW Team <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Fwd: Welcome to ACADFLOW - Your New Academic Experiment & Assignment Hub 🚀",
    html: htmlContent,
  });
};

export default async function handler(req, res) {
  try {
    const data = req.body;

    const result = await processBulkEmails(data);

    return res.status(200).json({
      message: "AcadFlow notifications processed",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

