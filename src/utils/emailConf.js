import nodemailer from "nodemailer";

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

export async function sendEmail(to, subject, html) {
    return transporter.sendMail({
        from: `"AcadFlow" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
}