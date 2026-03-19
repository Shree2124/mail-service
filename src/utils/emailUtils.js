export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function transformEmail(email, year) {
    let updatedEmail = email;

    // Year = 3 --> remove "te" prefix
    if (year === 3 && updatedEmail.startsWith("te")) {
        updatedEmail = updatedEmail.replace(/^te/, "");
    }

    // Year = 2 --> replace only "vu1s2425" --> "vu1s2526"
    if (year === 2) {
        updatedEmail = updatedEmail.replace(/vu1s2425/i, "vu1s2526");
    }

    return updatedEmail;
}