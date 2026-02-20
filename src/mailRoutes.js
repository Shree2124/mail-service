import express from "express";
import { sendUserCredentialsMail } from "./mail.js";

const router = express.Router();

router.post("/send-credentials", async (req, res) => {
    try {
        const data = req.body;

        // Convert to array if single object
        const users = Array.isArray(data) ? data : [data];

        // Validate all users
        for (const user of users) {
            const { email, name, username, password } = user;
            if (!email || !name || !username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required for every user",
                });
            }
        }

        // 🚀 Send emails in parallel (fast)
        const results = await Promise.allSettled(
            users.map((user) => sendUserCredentialsMail(user))
        );

        // Separate success & failed
        const success = [];
        const failed = [];

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                success.push(users[index].email);
            } else {
                failed.push({
                    email: users[index].email,
                    error: result.reason.message,
                });
            }
        });

        res.status(200).json({
            success: true,
            message: "Bulk email process completed",
            total: users.length,
            sent: success.length,
            failed: failed.length,
            successEmails: success,
            failedEmails: failed,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong ❌",
        });
    }
});

export default router;