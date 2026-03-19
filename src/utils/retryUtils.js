export function shouldRetry(error) {
    const msg = error?.message?.toLowerCase() || "";

    // Do NOT retry for invalid email
    if (
        msg.includes("invalid") ||
        msg.includes("no such user") ||
        msg.includes("recipient address rejected") ||
        msg.includes("550")
    ) {
        return false;
    }

    // Retry for temporary issues
    if (
        msg.includes("timeout") ||
        msg.includes("network") ||
        msg.includes("connection") ||
        msg.includes("rate limit")
    ) {
        return true;
    }

    // default retry
    return true;
}