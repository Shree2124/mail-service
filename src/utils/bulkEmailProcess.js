import { transformEmail, isValidEmail } from "./emailUtils.js";
import { shouldRetry } from "./retryUtils.js";
import { sendEmail } from "./emailConf.js";
import { generateEmailContent } from "./emailFormatter.js";

const MAX_RETRIES = 3;
const CONCURRENCY = 10; //control parallel emails

export async function processBulkEmails(data) {
    const { emailIds, year } = data;

    const results = {
        success: [],
        failed: [],
        skipped: [],
    };

    const { subject, html } = generateEmailContent(data);

    async function processSingle(email) {
        let transformed = transformEmail(email, year);

        if (!isValidEmail(transformed)) {
            results.skipped.push({ email, reason: "Invalid format" });
            return;
        }

        let attempt = 0;

        while (attempt < MAX_RETRIES) {
            try {
                await sendEmail(transformed, subject, html);

                results.success.push(transformed);
                return;
            } catch (error) {
                attempt++;

                const retry = shouldRetry(error);

                //Skip retry if invalid address type error
                if (!retry) {
                    results.skipped.push({
                        email: transformed,
                        reason: error.message,
                    });
                    return;
                }

                if (attempt >= MAX_RETRIES) {
                    results.failed.push({
                        email: transformed,
                        error: error.message,
                    });
                    return;
                }

                //small delay before retry
                await new Promise((res) => setTimeout(res, 1000 * attempt));
            }
        }
    }

    //Concurrency Pool
    const pool = [];
    for (let email of emailIds) {
        const p = processSingle(email);
        pool.push(p);

        if (pool.length >= CONCURRENCY) {
            await Promise.all(pool);
            pool.length = 0;
        }
    }

    // remaining
    if (pool.length) {
        await Promise.all(pool);
    }

    return results;
}