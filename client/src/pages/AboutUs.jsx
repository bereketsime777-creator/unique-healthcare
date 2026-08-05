import { Link } from "react-router-dom";

const stats = [
  { value: "200+", label: "Hospitals Served" },
  { value: "500+", label: "Products Available" },
  { value: "10+",  label: "Years Experience" },
  { value: "98%",  label: "Customer Satisfaction" },
];

const values = [
  { icon: "🏅", title: "Quality First",        desc: "Every product meets international healthcare standards. We never compromise on quality." },
  { icon: "🤝", title: "Trusted Partnerships", desc: "We work with Mindray, Philips, Dräger, Siemens and more to bring you the best equipment." },
  { icon: "🚚", title: "Reliable Delivery",    desc: "Fast, safe delivery across Ethiopia with professional handling of sensitive medical devices." },
  { icon: "🛠️", title: "After-Sales Support", desc: "Our technical team provides installation, training, and ongoing maintenance support." },
  { icon: "💰", title: "Fair Pricing",          desc: "Competitive pricing with bulk discounts for hospitals, clinics and institutions." },
  { icon: "🌍", title: "Local Expertise",       desc: "10+ years serving Ethiopian healthcare facilities. We understand what you need." },
];

const team = [
  { name: "Dr. Abebe Tadesse",  role: "Chief Executive Officer",      emoji: "👨‍⚕️" },
  { name: "Meron Haile",        role: "Head of Operations",           emoji: "👩‍💼" },
  { name: "Yonas Bekele",       role: "Technical Director",           emoji: "👨‍🔧" },
  { name: "Tigist Alemu",       role: "Customer Relations Manager",   emoji: "👩‍💻" },
];

const s = {
  page:      { background: "#fff", minHeight: "100vh" },
  breadcrumb:{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "14px 0" },
  breadWrap: { maxWidth: "1280px", margin: "0 auto", padding: "0 32px" },
  crumbRow:  { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#94a3b8", marginBottom: "4px" },
  crumbLink: { color: "#2563eb", textDecoration: "none" },
  pageTitle: { fontWeight: 800, fontSize: "22px", color: "#0f172a", margin: 0 },

  /* hero */
  hero:      { background: "#1d4ed8", padding: "72px 0", textAlign: "center" },
  heroWrap:  { maxWidth: "900px", margin: "0 auto", padding: "0 32px" },
  heroTag:   { color: "#bfdbfe", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", display: "block" },
  heroH2:    { color: "#fff", fontWeight: 900, fontSize: "42px", lineHeight: 1.2, margin: "0 0 16px" },
  heroP:     { color: "#bfdbfe", fontSize: "16px", lineHeight: 1.7, margin: "0 auto", maxWidth: "600px" },

  /* stats */
  statsBar:  { background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "28px 0" },
  statsWrap: { maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" },
  statItem:  { textAlign: "center", padding: "8px 0" },
  statVal:   { color: "#2563eb", fontWeight: 900, fontSize: "36px", margin: 0 },
  statLbl:   { color: "#64748b", fontSize: "13px", margin: "2px 0 0" },

  /* section wrapper */
  section:   { padding: "72px 0" },
  wrap:      { maxWidth: "1280px", margin: "0 auto", padding: "0 32px" },
  secTag:    { color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px", display: "block" },
  secH2:     { color: "#0f172a", fontWeight: 800, fontSize: "30px", margin: "0 0 12px" },
  secP:      { color: "#64748b", fontSize: "15px", lineHeight: 1.7 },

  /* story */
  storyGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" },
  storyCard: { background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "20px", padding: "28px", textAlign: "center" },
  storyIcon: { fontSize: "40px", marginBottom: "8px" },
  storyVal:  { color: "#0f172a", fontWeight: 800, fontSize: "18px", margin: "0 0 4px" },
  storySub:  { color: "#94a3b8", fontSize: "12px", margin: 0 },

  /* values */
  valGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" },
  valCard:   { border: "1.5px solid #f1f5f9", borderRadius: "20px", padding: "28px" },
  valIcon:   { width: "52px", height: "52px", background: "#eff6ff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "16px" },
  valH3:     { color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 8px" },
  valP:      { color: "#64748b", fontSize: "13px", lineHeight: 1.65, margin: 0 },

  /* team */
  teamGrid:  { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" },
  teamCard:  { background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: "20px", padding: "28px", textAlign: "center" },
  teamAvatar:{ width: "72px", height: "72px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 16px" },
  teamName:  { color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" },
  teamRole:  { color: "#2563eb", fontSize: "12px", margin: 0 },

  /* cta */
  cta:       { background: "#2563eb", padding: "64px 0", textAlign: "center" },
  ctaH2:     { color: "#fff", fontWeight: 900, fontSize: "34px", margin: "0 0 12px" },
  ctaP:      { color: "#bfdbfe", fontSize: "15px", margin: "0 0 32px" },
  btnRow:    { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
  btnWhite:  { background: "#fff", color: "#2563eb", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" },
  btnOutline:{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" },
};

export default function AboutUs() {
  return (
    <div style={s.page}>

      {/* Breadcrumb */}
      <div style={s.breadcrumb}>
        <div style={s.breadWrap}>
          <div style={s.crumbRow}>
            <Link to="/" style={s.crumbLink}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0f172a" }}>About Us</span>
          </div>
          <h1 style={s.pageTitle}>About Us</h1>
        </div>
      </div>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroWrap}>
          <span style={s.heroTag}>Trusted by Hospitals. Driven by Care.</span>
          <h2 style={s.heroH2}>Your Trusted Partner in<br />Hospital Equipment Solutions</h2>
          <p style={s.heroP}>
            Unique Healthcare has been at the forefront of supplying high-quality medical equipment
            and supplies to hospitals, clinics, and healthcare professionals across Ethiopia since 2014.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div style={s.statsBar}>
        <div style={s.statsWrap}>
          {stats.map((st, i) => (
            <div key={st.label} style={{ ...s.statItem, borderRight: i < stats.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <p style={s.statVal}>{st.value}</p>
              <p style={s.statLbl}>{st.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section style={{ ...s.section, background: "#fff" }}>
        <div style={s.wrap}>
          <div style={s.storyGrid}>
            <div>
              <span style={s.secTag}>Our Story</span>
              <h2 style={s.secH2}>A Decade of Serving Ethiopia's Healthcare Sector</h2>
              <p style={{ ...s.secP, marginBottom: "16px" }}>
                Founded in 2014 in Addis Ababa, Unique Healthcare started with a simple mission —
                to make world-class medical equipment accessible to every healthcare facility in Ethiopia.
              </p>
              <p style={{ ...s.secP, marginBottom: "16px" }}>
                Over the years we have grown to become one of Ethiopia's most trusted suppliers of
                diagnostic equipment, surgical instruments, patient monitoring devices, laboratory
                equipment, and medical consumables.
              </p>
              <p style={{ ...s.secP, marginBottom: "32px" }}>
                We are proud to be the official distributor of leading global brands including
                Mindray, Philips, Dräger, Siemens Healthineers, EDAN, and Getinge.
              </p>
              <div style={s.btnRow}>
                <Link to="/products" style={{ ...s.btnWhite, background: "#2563eb", color: "#fff" }}>Browse Products</Link>
                <Link to="/contact"  style={{ ...s.btnOutline, border: "2px solid #2563eb", color: "#2563eb" }}>Contact Us</Link>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { icon: "🏥", label: "200+ Hospitals", sub: "Across Ethiopia" },
                { icon: "📦", label: "500+ Products",  sub: "In our catalog" },
                { icon: "🔬", label: "15+ Brands",     sub: "Global partners" },
                { icon: "⭐", label: "10+ Years",      sub: "Of excellence" },
              ].map((c) => (
                <div key={c.label} style={s.storyCard}>
                  <div style={s.storyIcon}>{c.icon}</div>
                  <p style={s.storyVal}>{c.label}</p>
                  <p style={s.storySub}>{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ ...s.section, background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={s.secTag}>What We Stand For</span>
            <h2 style={{ ...s.secH2, margin: 0 }}>Our Core Values</h2>
          </div>
          <div style={s.valGrid}>
            {values.map((v) => (
              <div key={v.title} style={s.valCard}>
                <div style={s.valIcon}>{v.icon}</div>
                <h3 style={s.valH3}>{v.title}</h3>
                <p style={s.valP}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ ...s.section, background: "#fff" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={s.secTag}>The People Behind Us</span>
            <h2 style={{ ...s.secH2, margin: 0 }}>Meet Our Team</h2>
          </div>
          <div style={s.teamGrid}>
            {team.map((m) => (
              <div key={m.name} style={s.teamCard}>
                <div style={s.teamAvatar}>{m.emoji}</div>
                <p style={s.teamName}>{m.name}</p>
                <p style={s.teamRole}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 32px" }}>
          <h2 style={s.ctaH2}>Ready to Equip Your Facility?</h2>
          <p style={s.ctaP}>Browse our full catalog or get in touch for a custom quote.</p>
          <div style={s.btnRow}>
            <Link to="/products" style={s.btnWhite}>Shop Now</Link>
            <Link to="/contact"  style={s.btnOutline}>Get a Quote</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
