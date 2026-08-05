import { Link } from "react-router-dom";

const services = [
  { icon: "🔬", title: "Equipment Supply",          color: "#eff6ff", border: "#bfdbfe", desc: "We supply 500+ certified medical devices — diagnostic, surgical, monitoring, lab, and imaging — from globally recognised brands.", features: ["500+ products in catalog", "Genuine certified equipment", "Multiple global brands", "All healthcare categories"] },
  { icon: "🚚", title: "Delivery & Logistics",      color: "#f0fdf4", border: "#bbf7d0", desc: "Fast, safe, and reliable delivery across Ethiopia. We handle packaging, transportation, and on-site delivery with care for fragile devices.", features: ["Delivery across Ethiopia", "Safe specialized packaging", "Real-time order tracking", "Express delivery available"] },
  { icon: "🛠️", title: "Installation & Setup",     color: "#faf5ff", border: "#e9d5ff", desc: "Our certified technicians handle complete installation and commissioning — ensuring everything is correctly set up and calibrated from day one.", features: ["On-site installation", "Equipment calibration", "System integration", "Commissioning support"] },
  { icon: "📚", title: "Training & Education",      color: "#fffbeb", border: "#fde68a", desc: "Hands-on training for medical staff and biomedical engineers on proper use and maintenance of all equipment we supply — in English and Amharic.", features: ["Hands-on staff training", "Biomedical engineer training", "English & Amharic sessions", "Certificate of completion"] },
  { icon: "🔧", title: "Maintenance & Repair",      color: "#fff1f2", border: "#fecdd3", desc: "Scheduled preventive maintenance and emergency repair for all equipment we supply. Our technicians respond quickly to minimise downtime.", features: ["Preventive maintenance plans", "Emergency repair service", "Genuine spare parts", "Annual service contracts"] },
  { icon: "💼", title: "Bulk & Tender Supply",      color: "#f0f9ff", border: "#bae6fd", desc: "We specialise in large-scale procurement for government hospitals, NGOs, and private healthcare groups — full tender documentation included.", features: ["Government tenders", "NGO procurement support", "Volume discounts", "Full documentation"] },
  { icon: "📋", title: "Consultation & Planning",   color: "#ecfdf5", border: "#a7f3d0", desc: "Not sure what your facility needs? Our consultants will assess your requirements, recommend the right solutions, and help you plan within budget.", features: ["Needs assessment", "Equipment recommendations", "Budget planning", "Facility-specific advice"] },
  { icon: "🛡️", title: "Warranty & After-Sales",   color: "#fff7ed", border: "#fed7aa", desc: "All products come with manufacturer warranty backed by our local after-sales team — spare parts, warranty claims, and ongoing technical support.", features: ["Manufacturer warranty", "Local warranty claims", "Spare parts availability", "Dedicated support team"] },
];

const process = [
  { step: "01", title: "Contact Us",      desc: "Reach out via phone, email, or contact form with your requirements." },
  { step: "02", title: "Consultation",    desc: "Our experts assess your needs and recommend the best solutions." },
  { step: "03", title: "Quotation",       desc: "We provide a detailed quote with pricing, timeline, and terms." },
  { step: "04", title: "Order & Delivery",desc: "Confirm order and we handle procurement, logistics, and delivery." },
  { step: "05", title: "Installation",    desc: "Technicians install and commission the equipment at your facility." },
  { step: "06", title: "Ongoing Support", desc: "Training, maintenance, and after-sales support long-term." },
];

const s = {
  page:      { background: "#fff", minHeight: "100vh" },
  breadcrumb:{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "14px 0" },
  breadWrap: { maxWidth: "1280px", margin: "0 auto", padding: "0 32px" },
  crumbRow:  { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#94a3b8", marginBottom: "4px" },
  crumbLink: { color: "#2563eb", textDecoration: "none" },
  pageTitle: { fontWeight: 800, fontSize: "22px", color: "#0f172a", margin: 0 },
  hero:      { background: "#1d4ed8", padding: "72px 0", textAlign: "center" },
  heroWrap:  { maxWidth: "900px", margin: "0 auto", padding: "0 32px" },
  heroTag:   { color: "#bfdbfe", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", display: "block" },
  heroH2:    { color: "#fff", fontWeight: 900, fontSize: "42px", lineHeight: 1.2, margin: "0 0 16px" },
  heroP:     { color: "#bfdbfe", fontSize: "16px", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: "600px" },
  btnRow:    { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
  btnWhite:  { background: "#fff", color: "#2563eb", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" },
  btnOutline:{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" },
  section:   { padding: "72px 0" },
  wrap:      { maxWidth: "1280px", margin: "0 auto", padding: "0 32px" },
  secTag:    { color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px", display: "block" },
  secH2:     { color: "#0f172a", fontWeight: 800, fontSize: "30px", margin: "0 0 10px" },
  secP:      { color: "#64748b", fontSize: "15px", lineHeight: 1.7, margin: "0 auto", maxWidth: "560px" },
  cta:       { background: "#2563eb", padding: "64px 0", textAlign: "center" },
  ctaH2:     { color: "#fff", fontWeight: 900, fontSize: "34px", margin: "0 0 12px" },
  ctaP:      { color: "#bfdbfe", fontSize: "15px", margin: "0 0 32px" },
};

export default function Services() {
  return (
    <div style={s.page}>

      {/* Breadcrumb */}
      <div style={s.breadcrumb}>
        <div style={s.breadWrap}>
          <div style={s.crumbRow}>
            <Link to="/" style={s.crumbLink}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0f172a" }}>Services</span>
          </div>
          <h1 style={s.pageTitle}>Our Services</h1>
        </div>
      </div>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroWrap}>
          <span style={s.heroTag}>End-to-End Healthcare Solutions</span>
          <h2 style={s.heroH2}>More Than Just Equipment Supply</h2>
          <p style={s.heroP}>
            From consultation and procurement to installation, training, and long-term maintenance —
            we support your facility at every step.
          </p>
          <div style={s.btnRow}>
            <Link to="/contact"  style={s.btnWhite}>Request a Service</Link>
            <Link to="/products" style={s.btnOutline}>Browse Products</Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ ...s.section, background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={s.secTag}>What We Offer</span>
            <h2 style={{ ...s.secH2, margin: "0 0 10px" }}>Our Complete Service Portfolio</h2>
            <p style={s.secP}>Everything your healthcare facility needs — under one roof.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {services.map((sv) => (
              <div key={sv.title} style={{ background: sv.color, border: `1.5px solid ${sv.border}`, borderRadius: "20px", padding: "28px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "56px", height: "56px", background: "#fff", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    {sv.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "17px", margin: "0 0 8px" }}>{sv.title}</h3>
                    <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.65, margin: "0 0 16px" }}>{sv.desc}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                      {sv.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#475569" }}>
                          <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ ...s.section, background: "#fff" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={s.secTag}>Simple Process</span>
            <h2 style={{ ...s.secH2, margin: "0 0 8px" }}>How It Works</h2>
            <p style={s.secP}>Getting the right equipment for your facility is easy with us.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
            {process.map((p, i) => (
              <div key={p.step} style={{ textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "16px", margin: "0 auto 14px" }}>
                  {p.step}
                </div>
                <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "13px", margin: "0 0 6px" }}>{p.title}</h3>
                <p style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ ...s.section, background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={s.secTag}>Why Unique Healthcare</span>
            <h2 style={{ ...s.secH2, margin: 0 }}>The Difference We Make</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {[
              { icon: "🏅", title: "Certified Equipment",  desc: "Every product meets WHO and international medical standards." },
              { icon: "⚡", title: "Fast Turnaround",      desc: "Quick procurement and delivery — time is critical in healthcare." },
              { icon: "🤝", title: "Local Expertise",      desc: "10+ years serving Ethiopian facilities. We know your needs." },
              { icon: "📞", title: "Always Available",     desc: "Dedicated support team for any technical or service need." },
            ].map((f) => (
              <div key={f.title} style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "20px", padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 32px" }}>
          <h2 style={s.ctaH2}>Need a Service? Let&apos;s Talk.</h2>
          <p style={s.ctaP}>Contact our team today for a free consultation and service quote.</p>
          <div style={s.btnRow}>
            <Link to="/contact" style={s.btnWhite}>Contact Us</Link>
            <a href="tel:+251111234567" style={s.btnOutline}>📞 +251 11 123 4567</a>
          </div>
        </div>
      </section>

    </div>
  );
}
