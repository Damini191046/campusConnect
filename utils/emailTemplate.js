const resetPasswordTemplate = (resetLink) => {
    return `
        <h2>Password Reset Request</h2>

        <p>You requested to reset your password.</p>

        <p>Click the link below to reset your password:</p>

        <a href="${resetLink}">Reset Password</a>

        <p>This link will expire in 10 minutes.</p>

        <p>If you did not request this, please ignore this email.</p>
    `
}

module.exports = resetPasswordTemplate