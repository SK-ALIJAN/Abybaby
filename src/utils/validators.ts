export const isValidEmail = (email: string): boolean => {
    if (!email) return false;

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email.trim());
};




export const getPasswordStrength = (password: string) => {
    const strength = {
        hasMinLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(strength).filter(Boolean).length;

    let level: "weak" | "medium" | "strong" = "weak";

    if (score >= 4) level = "strong";
    else if (score >= 3) level = "medium";

    return {
        ...strength,
        score,
        level,
    };
};
