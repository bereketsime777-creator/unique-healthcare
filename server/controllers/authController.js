const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// ==============================
// Register
// ==============================
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ==============================
// Login
// ==============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// ==============================
// Forgot Password
// ==============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success even if user not found (security best practice)
    if (!user) {
      return res.json({
        message: "If an account with that email exists, a reset link has been sent.",
      });
    }

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash it before storing (store hash, send plain token in email)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS &&
        !process.env.EMAIL_USER.includes("your_gmail")) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Unique Healthcare" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Password Reset Request — Unique Healthcare",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f8fafc;">
              <div style="background: #1d4ed8; padding: 28px 32px; text-align: center;">
                <h1 style="color: #fff; margin: 0; font-size: 22px;">Unique Healthcare</h1>
                <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 13px;">Better Equipment. Better Care.</p>
              </div>
              <div style="padding: 36px 32px; background: #fff;">
                <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 12px;">Reset Your Password</h2>
                <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">
                  Hi <strong>${user.name}</strong>, we received a request to reset your Unique Healthcare account password.
                  Click the button below to set a new password.
                </p>
                <div style="text-align: center; margin: 0 0 28px;">
                  <a href="${resetUrl}"
                    style="display: inline-block; background: #1d4ed8; color: #fff; padding: 14px 36px;
                    border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none;">
                    Reset Password
                  </a>
                </div>
                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px;">
                  This link will expire in <strong>1 hour</strong>.
                </p>
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                  If you did not request this, you can safely ignore this email.
                  Your password will not be changed.
                </p>
              </div>
              <div style="background: #1e293b; padding: 16px 32px; text-align: center;">
                <p style="color: #64748b; font-size: 11px; margin: 0;">
                  © 2026 Unique Healthcare · Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Email send error:", emailErr.message);
        // Don't fail the request — log it
      }
    } else {
      // Dev mode — log the reset URL to console
      console.log("=== DEV PASSWORD RESET URL ===");
      console.log(resetUrl);
      console.log("==============================");
    }

    res.json({
      message: "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// ==============================
// Reset Password
// ==============================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    // Hash the token from the URL to compare with stored hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset link is invalid or has expired. Please request a new one.",
      });
    }

    // Set new password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successfully. You can now sign in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// ==============================
// Verify Reset Token (check if valid before showing form)
// ==============================
const verifyResetToken = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ valid: false, message: "Link is invalid or expired." });
    }

    res.json({ valid: true, name: user.name });
  } catch (error) {
    res.status(500).json({ valid: false, message: "Server error." });
  }
};

module.exports = { register, login, forgotPassword, resetPassword, verifyResetToken };
