import { useState } from "react";
import { FiMail } from "react-icons/fi";
import API from "../services/api";

export default function NewsletterSignup({ variant = "home" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const isFooter = variant === "footer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setStatus("loading");
      setMessage("");
      const res = await API.post("/newsletter", { email: email.trim() });
      setStatus("success");
      setMessage(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Subscription failed. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <span style={{
        color: isFooter ? "#4ade80" : "#16a34a",
        fontWeight: 700,
        fontSize: isFooter ? "14px" : "15px",
        ...(isFooter ? {} : { display: "block", textAlign: "center" }),
      }}>
        {isFooter ? `✓ ${message}` : (
          <>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "24px", margin: "0 0 8px" }}>{message}</h2>
            <p style={{ color: "#64748b", fontSize: "14px" }}>We&apos;ll keep you updated on new products and offers.</p>
          </>
        )}
      </span>
    );
  }

  if (isFooter) {
    return (
      <form onSubmit={handleSubmit} className="footer-newsletter-form">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1.5px solid rgba(255,255,255,0.25)",
            color: "#fff",
            borderRadius: "50px",
            padding: "10px 20px",
            fontSize: "13px",
            outline: "none",
            fontFamily: "inherit",
            width: "220px",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            background: "#fff",
            color: "#1d4ed8",
            border: "none",
            borderRadius: "50px",
            padding: "10px 22px",
            fontWeight: 700,
            fontSize: "13px",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
        {status === "error" && (
          <p style={{ color: "#fca5a5", fontSize: "12px", margin: "8px 0 0", width: "100%" }}>{message}</p>
        )}
      </form>
    );
  }

  return (
    <div>
      <div style={{
        width: "56px", height: "56px", background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px", color: "#2563eb",
      }}>
        <FiMail size={24} />
      </div>
      <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "26px", margin: "0 0 10px" }}>
        Subscribe for <span style={{ color: "#2563eb" }}>exclusive updates</span>
      </h2>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
        Be the first to know about new arrivals, special offers, and healthcare news.
      </p>
      <form onSubmit={handleSubmit} className="newsletter-form-inline">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder="Enter your email address"
          required
          disabled={status === "loading"}
          style={{
            flex: 1,
            border: "2px solid #e2e8f0",
            borderRadius: "50px",
            padding: "12px 20px",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: "14px",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "12px" }}>{message}</p>
      )}
    </div>
  );
}
