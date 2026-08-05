const Message = require("../models/Message");
const nodemailer = require("nodemailer");

// ==============================
// Send Message (Public)
// ==============================
const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get All Messages (Admin)
// ==============================
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Single Message (Admin)
// ==============================
const getMessageById = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });

    // Mark as read if unread
    if (msg.status === "unread") {
      msg.status = "read";
      await msg.save();
    }

    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Reply to Message (Admin)
// ==============================
const replyToMessage = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({ message: "Reply text is required." });
    }

    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });

    // Send email reply via Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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
          to: msg.email,
          subject: `Re: ${msg.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1a56db; padding: 20px; text-align: center;">
                <h2 style="color: white; margin: 0;">Unique Healthcare</h2>
                <p style="color: #bfdbfe; margin: 5px 0 0;">Better Equipment. Better Care.</p>
              </div>
              <div style="padding: 30px; background: #f8fafc;">
                <p style="color: #374151;">Dear <strong>${msg.name}</strong>,</p>
                <p style="color: #374151;">Thank you for contacting us. Here is our reply to your message regarding <strong>"${msg.subject}"</strong>:</p>
                <div style="background: white; border-left: 4px solid #1a56db; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <p style="color: #1e293b; margin: 0; white-space: pre-wrap;">${reply}</p>
                </div>
                <p style="color: #6b7280; font-size: 14px;">Your original message:</p>
                <div style="background: #f1f5f9; padding: 12px; border-radius: 4px; color: #6b7280; font-size: 14px;">
                  <p style="margin: 0; white-space: pre-wrap;">${msg.message}</p>
                </div>
              </div>
              <div style="background: #1e293b; padding: 16px; text-align: center;">
                <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                  Unique Healthcare | Bole Sub-City, Addis Ababa, Ethiopia<br/>
                  📞 +251 11 123 4567 | ✉️ info@uniquehealthcare.et
                </p>
              </div>
            </div>
          `,
        });

        console.log("Reply email sent to:", msg.email);
      } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
        // Don't fail the request if email fails — still save the reply
      }
    }

    // Save reply to DB
    msg.reply = reply;
    msg.status = "replied";
    msg.repliedAt = new Date();
    await msg.save();

    res.json({ message: "Reply sent successfully", data: msg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Delete Message (Admin)
// ==============================
const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });

    await msg.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get Unread Count (Admin)
// ==============================
const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({ status: "unread" });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
  getMessageById,
  replyToMessage,
  deleteMessage,
  getUnreadCount,
};
