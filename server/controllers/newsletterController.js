const NewsletterSubscriber = require("../models/NewsletterSubscriber");

const subscribe = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.json({
        message: "You're already subscribed!",
        alreadySubscribed: true,
      });
    }

    await NewsletterSubscriber.create({ email });

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { subscribe };
