import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { CONTACT } from "../constants/contact";

const info = [
  { icon: "📍", title: "Our Office", lines: CONTACT.address.lines },
  { icon: "📞", title: "Phone", lines: CONTACT.phones.map((p) => p.display), links: CONTACT.phones.map((p) => `tel:${p.tel}`) },
  { icon: "✉️", title: "Email", lines: [CONTACT.email], links: [`mailto:${CONTACT.email}`] },
  { icon: "✈️", title: CONTACT.telegram.label, lines: ["Chat with us on Telegram"], links: [CONTACT.telegram.url] },
  { icon: "🕐", title: "Working Hours", lines: CONTACT.hours.lines },
];

const trust = [
  { icon: "⚡", title: "Fast Response",    desc: "We reply within 24 hours" },
  { icon: "💬", title: "Expert Advice",    desc: "Talk to our product specialists" },
  { icon: "📋", title: "Free Quotes",      desc: "Get detailed pricing quickly" },
  { icon: "🤝", title: "Dedicated Support",desc: "Long-term after-sales care" },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await API.post("/messages", form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const input = {
    width: "100%",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    color: "#0f172a",
    background: "#fff",
    boxSizing: "border-box",
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "14px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#94a3b8", marginBottom: "4px" }}>
            <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0f172a" }}>Contact Us</span>
          </div>
          <h1 style={{ fontWeight: 800, fontSize: "22px", color: "#0f172a", margin: 0 }}>Contact Us</h1>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "#1d4ed8", padding: "64px 0", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(28px, 5vw, 42px)", margin: "0 0 14px" }}>Get In Touch</h2>
          <p style={{ color: "#bfdbfe", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
            Have a question about a product, need a bulk quote, or want technical support?
            Our team is ready to help.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="page-wrap">
          <div className="responsive-grid-1-2">

            {/* Info cards */}
            <div>
              <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "20px", margin: "0 0 20px" }}>Contact Information</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {info.map((c) => (
                  <div key={c.title} style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "16px", padding: "18px 20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "44px", height: "44px", background: "#eff6ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "14px", margin: "0 0 4px" }}>{c.title}</p>
                      {c.lines.map((l, i) => (
                        c.links?.[i] ? (
                          <a key={l} href={c.links[i]} target={c.links[i].startsWith("http") ? "_blank" : undefined} rel={c.links[i].startsWith("http") ? "noreferrer" : undefined}
                            style={{ color: "#64748b", fontSize: "13px", margin: 0, display: "block", textDecoration: "none" }}>
                            {l}
                          </a>
                        ) : (
                          <p key={l} style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{l}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "16px", overflow: "hidden", marginTop: "16px" }}>
                <div style={{ background: "#eff6ff", height: "160px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "36px", marginBottom: "8px" }}>🗺️</span>
                  <p style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", margin: 0 }}>{CONTACT.address.mapTitle}</p>
                  <p style={{ color: "#94a3b8", fontSize: "12px", margin: "2px 0 0" }}>{CONTACT.address.mapSubtitle}</p>
                </div>
                <div style={{ padding: "14px" }}>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                    style={{ display: "block", textAlign: "center", border: "1.5px solid #2563eb", color: "#2563eb", borderRadius: "10px", padding: "9px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "20px", padding: "clamp(20px, 4vw, 36px)" }}>
              <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "20px", margin: "0 0 6px" }}>Send Us a Message</h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 28px" }}>
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
                  <h3 style={{ color: "#0f172a", fontWeight: 800, fontSize: "22px", margin: "0 0 8px" }}>Message Sent!</h3>
                  <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 24px" }}>
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "50px", padding: "12px 28px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#e11d48", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px" }}>
                      ⚠ {error}
                    </div>
                  )}

                  <div className="responsive-grid-form-2" style={{ marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Dr. Abebe Kebede" style={input} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@hospital.com" style={input} />
                    </div>
                  </div>

                  <div className="responsive-grid-form-2" style={{ marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 9XX XXX XXX" style={input} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Subject *</label>
                      <select name="subject" value={form.subject} onChange={handleChange} required style={{ ...input }}>
                        <option value="">Select a subject</option>
                        <option>Product Inquiry</option>
                        <option>Bulk / Wholesale Order</option>
                        <option>Request a Quote</option>
                        <option>Technical Support</option>
                        <option>Order Status</option>
                        <option>Partnership Opportunity</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                      placeholder="Tell us about your needs — what products you're looking for, your facility type, quantity required, etc."
                      style={{ ...input, resize: "vertical", lineHeight: 1.6 }} />
                  </div>

                  <button type="submit" disabled={loading}
                    style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: "50px", padding: "14px", fontWeight: 700, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
                    {loading ? "↻  Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "48px 0" }}>
        <div className="page-wrap">
          <div className="responsive-grid-4" style={{ gap: "24px" }}>
            {trust.map((t) => (
              <div key={t.title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{t.icon}</div>
                <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>{t.title}</p>
                <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
