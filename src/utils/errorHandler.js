export const handleFirebaseError = (error) => {
    if (error.message === "Request timeout" || error.name === "AbortError") {
        return "Request timed out. Please try again.";
    }

    if (
        error.message?.includes("network") ||
        error.code?.includes("network") ||
        error.code === "auth/network-request-failed"
    ) {
        return "Network error. Please check your connection.";
    }

    if (error.code === "permission-denied") {
        return "You don't have permission to perform this action.";
    }
    if (error.code === "auth/invalid-credential") {
        return "Wrong email or password";
    }
    if (error.code === "auth/email-already-in-use") {
        return "This email is already registered";
    }

    if (error.code === "not-found") {
        return "Item not found. It may have been already deleted.";
    }

    if (error.code === "invalid-argument") {
        return "Invalid data. Please check your input.";
    }

    return error.message || "Something went wrong. Please try again.";
};
