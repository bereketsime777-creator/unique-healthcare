import { Link } from "react-router-dom";

export default function LegalPageLayout({ title, children }) {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ borderBottom: "1px solid #f1f5f9", padding: "14px 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#94a3b8", marginBottom: "4px" }}>
            <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#0f172a" }}>{title}</span>
          </div>
          <h1 style={{ fontWeight: 800, fontSize: "22px", color: "#0f172a", margin: 0 }}>{title}</h1>
        </div>
      </div>

      <section style={{ padding: "48px 0 72px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 32px", color: "#475569", fontSize: "15px", lineHeight: 1.8 }}>
          {children}
        </div>
      </section>
    </div>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "18px", margin: "0 0 10px" }}>{heading}</h2>
      {children}
    </div>
  );
}
