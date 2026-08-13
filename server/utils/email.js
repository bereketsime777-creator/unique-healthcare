const nodemailer = require("nodemailer");

function isEmailConfigured() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return false;
  if (user.includes("your_gmail") || pass.includes("your_gmail_app_password")) {
    return false;
  }
  return true;
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function wrapEmailLayout({ title, bodyHtml }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f8fafc;">
      <div style="background: #1d4ed8; padding: 28px 32px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">Unique Healthcare</h1>
        <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 13px;">Better Equipment. Better Care.</p>
      </div>
      <div style="padding: 36px 32px; background: #fff;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 12px;">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="background: #1e293b; padding: 16px 32px; text-align: center;">
        <p style="color: #64748b; font-size: 11px; margin: 0;">
          © 2026 Unique Healthcare · Addis Ababa, Ethiopia
        </p>
      </div>
    </div>
  `;
}

async function sendEmail({ to, subject, html }) {
  if (!isEmailConfigured()) {
    return { sent: false, reason: "Email not configured" };
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Unique Healthcare" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Email send error:", error.message);
    return { sent: false, reason: error.message };
  }
}

const ORDER_STATUS_CONTENT = {
  Pending: {
    subject: "Order Update — Pending",
    title: "Your Order Is Pending",
    message:
      "We have received your order and it is currently pending review. We will notify you when processing begins.",
  },
  Processing: {
    subject: "Your Order Is Being Processed",
    title: "Order Processing Started",
    message:
      "Good news! Your order is now being processed. Our team is preparing your medical equipment for delivery.",
  },
  Shipped: {
    subject: "Your Order Has Shipped",
    title: "Order Shipped",
    message:
      "Your order is on its way. We have shipped your items and they should arrive soon.",
  },
  Delivered: {
    subject: "Your Order Has Been Delivered",
    title: "Order Delivered",
    message:
      "Your order has been delivered. Thank you for choosing Unique Healthcare.",
  },
  Cancelled: {
    subject: "Order Cancelled",
    title: "Order Cancelled",
    message:
      "Your order has been cancelled. If you have questions, please contact our support team.",
  },
};

function buildOrderItemsHtml(items = []) {
  if (!items.length) {
    return "<p style='color:#64748b;font-size:14px;'>No items listed.</p>";
  }

  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;color:#475569;font-size:13px;">${item.name || "Product"}</td>
        <td style="padding:8px 0;color:#475569;font-size:13px;text-align:center;">×${item.quantity || 1}</td>
        <td style="padding:8px 0;color:#0f172a;font-size:13px;text-align:right;font-weight:600;">
          ETB ${Number((item.price || 0) * (item.quantity || 1)).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <thead>
        <tr>
          <th style="text-align:left;color:#94a3b8;font-size:11px;text-transform:uppercase;">Item</th>
          <th style="text-align:center;color:#94a3b8;font-size:11px;text-transform:uppercase;">Qty</th>
          <th style="text-align:right;color:#94a3b8;font-size:11px;text-transform:uppercase;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function sendOrderStatusEmail({ order, customer, status }) {
  const content = ORDER_STATUS_CONTENT[status];
  if (!content || !customer?.email) {
    return { sent: false, reason: "Missing customer email or invalid status" };
  }

  const orderId = order._id.toString().slice(-8).toUpperCase();
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  const bodyHtml = `
    <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 16px;">
      Hi <strong>${customer.name || "Customer"}</strong>, ${content.message}
    </p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:20px;">
      <p style="margin:0 0 6px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Order #${orderId}</p>
      <p style="margin:0;color:#0f172a;font-size:14px;font-weight:700;">Status: ${status}</p>
      <p style="margin:8px 0 0;color:#2563eb;font-size:16px;font-weight:800;">
        Total: ETB ${Number(order.totalAmount || 0).toLocaleString()}
      </p>
    </div>
    ${buildOrderItemsHtml(order.items)}
    <div style="text-align:center;margin-top:24px;">
      <a href="${frontendUrl}/my-orders"
        style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">
        View My Orders
      </a>
    </div>
  `;

  return sendEmail({
    to: customer.email,
    subject: `${content.subject} — Unique Healthcare`,
    html: wrapEmailLayout({ title: content.title, bodyHtml }),
  });
}

async function sendPasswordResetEmail({ user, resetUrl }) {
  const bodyHtml = `
    <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Hi <strong>${user.name}</strong>, we received a request to reset your Unique Healthcare account password.
      Click the button below to set a new password.
    </p>
    <div style="text-align:center;margin:0 0 28px;">
      <a href="${resetUrl}"
        style="display:inline-block;background:#1d4ed8;color:#fff;padding:14px 36px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;">
        Reset Password
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;margin:0 0 8px;">
      This link will expire in <strong>1 hour</strong>.
    </p>
    <p style="color:#94a3b8;font-size:12px;margin:0;">
      If you did not request this, you can safely ignore this email.
    </p>
  `;

  return sendEmail({
    to: user.email,
    subject: "Password Reset Request — Unique Healthcare",
    html: wrapEmailLayout({ title: "Reset Your Password", bodyHtml }),
  });
}

module.exports = {
  isEmailConfigured,
  sendEmail,
  sendOrderStatusEmail,
  sendPasswordResetEmail,
  wrapEmailLayout,
};
