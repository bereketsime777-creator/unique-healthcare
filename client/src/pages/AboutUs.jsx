import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import Testimonials from "../components/Testimonials";

const stats = [
  { value: "200+", labelKey: "home.stats.hospitalsServed" },
  { value: "11",   labelKey: "home.stats.yearsExperience" },
  { value: "500+", labelKey: "home.stats.productsAvailable" },
  { value: "10+",  label: "Years of Service" },
];

const valuesData = [
  {
    titleKey: "about.integrity",
    descKey: "about.integrityDesc",
  },
  {
    titleKey: "about.quality",
    descKey: "about.qualityDesc",
  },
  {
    titleKey: "about.partnership",
    descKey: "about.partnershipDesc",
  },
  {
    titleKey: "about.service",
    descKey: "about.serviceDesc",
  },
];

const whyUsData = [
  {
    titleKey: "about.reliableProducts",
    descKey: "about.reliableDesc",
  },
  {
    titleKey: "about.nationwideReach",
    descKey: "about.nationwideDesc",
  },
  {
    titleKey: "about.professionalSupport",
    descKey: "about.supportDesc",
  },
  {
    titleKey: "about.customerFocused",
    descKey: "about.customerDesc",
  },
  {
    titleKey: "about.committedToHealth",
    descKey: "about.healthDesc",
  },
];

export default function AboutUs() {
  const { language } = useLanguage();

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
              {t(language, "about.pageTitle")}
            </p>
            <h2 style={{ 
              color: "#ffffff", 
              fontWeight: 900,
              fontSize: "clamp(28px, 4.5vw, 40px)",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              margin: "0",
              lineHeight: 1.2
            }}>
              {t(language, "about.heroTitle")}
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
      <section style={{ padding: "24px 0", background: "#fff" }}>
        <div style={s.wrap}>
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ ...s.body, fontSize: "15px", margin: "0" }}>
              {t(language, "about.intro")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: "#1d4ed8", padding: "28px 0" }}>
        <div style={s.wrap}>
          <div className="stats-bar-grid">
            {stats.map((st, i) => (
              <div key={st.value} style={{
                textAlign: "center", padding: "12px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: "36px", margin: "0 0 2px" }}>{st.value}</p>
                <p style={{ color: "#bfdbfe", fontSize: "12px", margin: 0, fontWeight: 500 }}>
                  {st.labelKey ? t(language, st.labelKey) : st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section style={{ padding: "56px 0", background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div className="responsive-grid-2col" style={{ gap: "48px" }}>
            <div>
              <span style={s.tag}>{t(language, "about.ourStory")}</span>
              <h2 style={s.h2}>{t(language, "about.storyTitle")}</h2>
              <p style={s.body}>
                {t(language, "about.storyP1")}
              </p>
              <p style={s.body}>
                {t(language, "about.storyP2")}
              </p>
              <p style={{ ...s.body, marginBottom: 0 }}>
                {t(language, "about.storyP3")}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { iconKey: "🏥", titleKey: "about.whoWeServe", descKey: "about.whoDesc" },
                { iconKey: "📦", titleKey: "about.whatWeSupply", descKey: "about.whatDesc" },
                { iconKey: "🤝", titleKey: "about.howWeWork", descKey: "about.howDesc" },
                { iconKey: "🌍", titleKey: "about.ourReach", descKey: "about.reachDesc" },
              ].map((c) => (
                <div key={c.titleKey} style={{ ...s.card, display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", background: "#eff6ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                    {c.iconKey}
                  </div>
                  <div>
                    <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>{t(language, c.titleKey)}</p>
                    <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{t(language, c.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div style={s.wrap}>
          <div className="responsive-grid-2col">

            {/* Mission */}
            <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: "20px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", background: "#2563eb", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span style={{ ...s.tag, color: "#2563eb" }}>{t(language, "about.mission")}</span>
              <p style={{ color: "#1e3a8a", fontSize: "15px", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                {t(language, "about.missionText")}
              </p>
            </div>

            {/* Vision */}
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "20px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", background: "#16a34a", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span style={{ ...s.tag, color: "#16a34a" }}>{t(language, "about.vision")}</span>
              <p style={{ color: "#14532d", fontSize: "15px", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                {t(language, "about.visionText")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: "56px 0", background: "#f8fafc" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={s.tag}>{t(language, "about.whatWeStandFor")}</span>
            <h2 style={{ ...s.h2, margin: 0 }}>{t(language, "about.coreValues")}</h2>
          </div>
          <div className="responsive-grid-4">
            {valuesData.map((v, i) => {
              const colors = ["#2563eb", "#7c3aed", "#16a34a", "#d97706"];
              const bgs    = ["#eff6ff", "#f5f3ff", "#f0fdf4", "#fffbeb"];
              return (
                <div key={v.titleKey} style={{ ...s.card, textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", background: bgs[i], borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <div style={{ width: "20px", height: "20px", background: colors[i], borderRadius: "4px" }} />
                  </div>
                  <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 10px" }}>{t(language, v.titleKey)}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>{t(language, v.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div style={s.wrap}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={s.tag}>{t(language, "about.whyChooseTitle")}</span>
            <h2 style={{ ...s.h2, margin: 0 }}>{t(language, "about.whyChooseUs")}</h2>
          </div>
          <div className="responsive-grid-3">
            {whyUsData.map((w, i) => {
              const icons = ["✓", "→", "★", "◎", "♥"];
              return (
                <div key={w.titleKey} style={{ ...s.card, borderLeft: "4px solid #2563eb", paddingLeft: "24px" }}>
                  <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "26px", height: "26px", background: "#eff6ff", borderRadius: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: "12px", fontWeight: 900, flexShrink: 0 }}>
                      {icons[i]}
                    </span>
                    {t(language, w.titleKey)}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>{t(language, w.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Belief statement ── */}
      <section style={{ padding: "48px 0", background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ ...s.wrap, maxWidth: "760px", textAlign: "center" }}>
          <p style={{ color: "#1e3a8a", fontSize: "18px", lineHeight: 1.8, fontWeight: 500, fontStyle: "italic", margin: "0 0 6px" }}>
            "{t(language, "about.belief")}"
          </p>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
            {t(language, "about.beliefDesc")}
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <section style={{ background: "#1d4ed8", padding: "56px 0" }}>
        <div style={{ ...s.wrap, textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "32px", margin: "0 0 12px" }}>
            {t(language, "about.partnerWithUs")}
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: "15px", margin: "0 0 32px" }}>
            {t(language, "about.partnerDesc")}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/products" style={{ background: "#fff", color: "#1d4ed8", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              {t(language, "about.browseProducts")}
            </Link>
            <Link to="/contact" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", padding: "13px 32px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              {t(language, "nav.contact")}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
