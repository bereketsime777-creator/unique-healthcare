import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";

const stats = [
  { value: "200+", label: "Healthcare Clients" },
  { value: "11",   label: "Regions Served" },
  { value: "500+", label: "Products Supplied" },
  { value: "10+",  label: "Years of Service" },
];

const values = [
  {
    title: "Integrity",
    desc: "We conduct our business with honesty, transparency, and accountability.",
  },
  {
    title: "Quality",
    desc: "We are committed to providing dependable products that meet the needs and expectations of healthcare professionals.",
  },
  {
    title: "Partnership",
    desc: "We build long-term relationships with our customers, suppliers, and partners through trust, communication, and reliable service.",
  },
  {
    title: "Service",
    desc: "We go beyond product delivery by providing responsive support and solutions that help our customers succeed.",
  },
];

const whyUs = [
  {
    title: "Reliable Products",
    desc: "Quality medical equipment sourced through trusted manufacturing and supply partners.",
  },
  {
    title: "Nationwide Reach",
    desc: "Serving healthcare institutions across all regions of Ethiopia.",
  },
  {
    title: "Professional Support",
    desc: "Dedicated assistance to help customers identify and implement the right solutions.",
  },
  {
    title: "Customer-Focused Service",
    desc: "We listen to our customers and build solutions around their specific healthcare needs.",
  },
  {
    title: "Committed to Healthcare",
    desc: "Our work is driven by one goal: helping strengthen healthcare delivery across Ethiopia.",
  },
];

export default function AboutUs() {
  const s = {
    tag:   { color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px", display: "block" },
    h2:    { color: "#0f172a", fontWeight: 800, fontSize: "32px", lineHeight: 1.25, margin: "0 0 16px" },
    body:  { color: "#475569", fontSize: "15px", lineHeight: 1.8, margin: "0 0 16px" },
    card:  { background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "16px", padding: "28px" },
    wrap:  { maxWidth: "1100px", margin: "0 auto", padding: "0 32px" },
  };

  return (
    <div style={{ background: "#fff" }}>
      <style>{`
        @keyframes scroll-indicator {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section 
        className="hero-section"
        style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
        backgroundImage: 'url(/images/hero1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "40px 0 50px",
        position: "relative",
        minHeight: "35vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <div className="hero-content">
            <p style={{ 
              color: "#fff", 
              fontWeight: 700, 
              fontSize: "12px", 
              letterSpacing: "3px", 
              textTransform: "uppercase", 
              marginBottom: "14px",
              opacity: 0.9
            }}>
              About Unique Healthcare
            </p>
            <h2 style={{ 
              color: "#ffffff", 
              fontWeight: 900,
              fontSize: "clamp(28px, 4.5vw, 40px)",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              margin: "0",
              lineHeight: 1.2
            }}>
              Healthcare Equipment Across Ethiopia
            </h2>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float 2s ease-in-out infinite"
        }}>
          <div style={{
            width: "26px",
            height: "42px",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "20px",
            position: "relative"
          }}>
            <div style={{
              width: "5px",
              height: "8px",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "3px",
              position: "absolute",
              top: "6px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "scroll-indicator 1.5s infinite"
            }}></div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div style={s.wrap}>
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ ...s.body, fontSize: "16px" }}>
              We work with hospitals, clinics, laboratories, pharmacies, medical institutions, and
              healthcare organizations to provide the equipment they need to deliver better, safer,
              and more efficient patient care.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: "#1d4ed8", padding: "40px 0" }}>
        <div style={s.wrap}>
          <div className="stats-bar-grid">
            {stats.map((st, i) => (
              <div key={st.label} style={{
                textAlign: "center", padding: "16px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: "40px", margin: "0 0 4px" }}>{st.value}</p>
                <p style={{ color: "#bfdbfe", fontSize: "13px", margin: 0, fontWeight: 500 }}>{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div className="responsive-grid-2col" style={{ gap: "64px" }}>
            <div>
              <span style={s.tag}>Our Story</span>
              <h2 style={s.h2}>Built to Strengthen Ethiopia's Healthcare System</h2>
              <p style={s.body}>
                Unique Healthcare PLC was established with a clear purpose: to contribute to the
                advancement of Ethiopia's healthcare system by making dependable medical technology
                more accessible.
              </p>
              <p style={s.body}>
                Over the years, we have built strong relationships with healthcare providers and
                international manufacturers, enabling us to supply a wide range of medical products
                to healthcare facilities across the country.
              </p>
              <p style={{ ...s.body, marginBottom: 0 }}>
                Our portfolio includes diagnostic equipment, surgical instruments, patient monitoring
                systems, laboratory equipment, hospital supplies, and emergency medical products.
                Beyond supplying products, we focus on providing dependable service, technical
                support, and warranty assistance to help our customers get the most from their
                investments.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "🏥", title: "Who We Serve", desc: "Hospitals, clinics, laboratories, pharmacies, and healthcare organizations nationwide." },
                { icon: "📦", title: "What We Supply", desc: "Diagnostic equipment, surgical instruments, monitoring systems, laboratory equipment, and emergency medical products." },
                { icon: "🤝", title: "How We Work", desc: "We listen, understand your needs, and deliver practical solutions that support better healthcare outcomes." },
                { icon: "🌍", title: "Our Reach", desc: "Serving healthcare institutions across all 11 regions of Ethiopia." },
              ].map((c) => (
                <div key={c.title} style={{ ...s.card, display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", background: "#eff6ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>{c.title}</p>
                    <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={s.wrap}>
          <div className="responsive-grid-2col">

            {/* Mission */}
            <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: "20px", padding: "36px" }}>
              <div style={{ width: "48px", height: "48px", background: "#2563eb", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span style={{ ...s.tag, color: "#2563eb" }}>Our Mission</span>
              <p style={{ color: "#1e3a8a", fontSize: "15px", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                To make quality, reliable, and affordable medical technology accessible to healthcare
                facilities across Ethiopia, helping healthcare professionals improve diagnosis,
                treatment, and patient care.
              </p>
            </div>

            {/* Vision */}
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "20px", padding: "36px" }}>
              <div style={{ width: "48px", height: "48px", background: "#16a34a", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span style={{ ...s.tag, color: "#16a34a" }}>Our Vision</span>
              <p style={{ color: "#14532d", fontSize: "15px", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                To contribute to a stronger Ethiopian healthcare system where every hospital, clinic,
                and healthcare facility has access to reliable medical technology, regardless of
                its location.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={s.tag}>What We Stand For</span>
            <h2 style={{ ...s.h2, margin: 0 }}>Our Core Values</h2>
          </div>
          <div className="responsive-grid-4">
            {values.map((v, i) => {
              const colors = ["#2563eb", "#7c3aed", "#16a34a", "#d97706"];
              const bgs    = ["#eff6ff", "#f5f3ff", "#f0fdf4", "#fffbeb"];
              return (
                <div key={v.title} style={{ ...s.card, textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", background: bgs[i], borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <div style={{ width: "20px", height: "20px", background: colors[i], borderRadius: "4px" }} />
                  </div>
                  <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 10px" }}>{v.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={s.tag}>Why Work With Us</span>
            <h2 style={{ ...s.h2, margin: 0 }}>Why Choose Unique Healthcare?</h2>
          </div>
          <div className="responsive-grid-3">
            {whyUs.map((w, i) => {
              const icons = ["✓", "→", "★", "◎", "♥"];
              return (
                <div key={w.title} style={{ ...s.card, borderLeft: "4px solid #2563eb", paddingLeft: "24px" }}>
                  <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "26px", height: "26px", background: "#eff6ff", borderRadius: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: "12px", fontWeight: 900, flexShrink: 0 }}>
                      {icons[i]}
                    </span>
                    {w.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Belief statement ── */}
      <section style={{ padding: "60px 0", background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ ...s.wrap, maxWidth: "760px", textAlign: "center" }}>
          <p style={{ color: "#1e3a8a", fontSize: "18px", lineHeight: 1.8, fontWeight: 500, fontStyle: "italic", margin: "0 0 6px" }}>
            "We believe that quality healthcare begins with access to the right technology."
          </p>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
            That's why we work closely with our customers to understand their needs and deliver
            practical solutions that support better healthcare outcomes.
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <section style={{ background: "#1d4ed8", padding: "64px 0" }}>
        <div style={{ ...s.wrap, textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "32px", margin: "0 0 12px" }}>
            Partner With Us
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: "15px", margin: "0 0 32px" }}>
            Let's work together to improve healthcare delivery across Ethiopia.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/products" style={{ background: "#fff", color: "#1d4ed8", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              Browse Products
            </Link>
            <Link to="/contact" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
