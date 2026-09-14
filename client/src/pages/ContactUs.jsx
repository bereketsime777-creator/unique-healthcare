import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";
  const productIdParam = searchParams.get("productId") || "";
  const productNameParam = searchParams.get("productName") || "";
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    subject: subjectParam, 
    message: "",
    requestType: "general",
    organizationName: "",
    location: "",
  });
  
  // Multi-product state for proforma
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [products, setProducts]   = useState([]);
  const [searchingProducts, setSearchingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [showProductSearch, setShowProductSearch] = useState(false);

  useEffect(() => {
    if (subjectParam) {
      const isProforma = subjectParam.toLowerCase().includes("proforma");
      setForm(prev => ({ 
        ...prev, 
        subject: subjectParam,
        requestType: isProforma ? "proforma" : "general",
      }));
    }
    // If product passed from product page, add it to selected products
    if (productIdParam && productNameParam) {
      setSelectedProducts([{
        productId: productIdParam,
        productName: productNameParam,
        quantity: 1,
      }]);
    }
  }, [subjectParam, productIdParam, productNameParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    
    // When subject changes to proforma, switch to proforma mode
    if (name === "subject") {
      const isProforma = value.toLowerCase().includes("proforma");
      setForm(prev => ({ ...prev, requestType: isProforma ? "proforma" : "general" }));
    }
  };

  // Fetch products for autocomplete
  const handleProductSearch = async (query) => {
    setProductSearch(query);
    if (query.length < 2) {
      setProducts([]);
      return;
    }
    try {
      setSearchingProducts(true);
      const res = await API.get("/products", { params: { search: query } });
      setProducts(res.data.slice(0, 10));
    } catch (err) {
      console.error("Product search failed:", err);
      setProducts([]);
    } finally {
      setSearchingProducts(false);
    }
  };

  const addProduct = (product) => {
    // Check if product already selected
    if (selectedProducts.some(p => p.productId === product._id)) {
      setError("This product is already selected");
      return;
    }
    
    setSelectedProducts([...selectedProducts, {
      productId: product._id,
      productName: product.name,
      quantity: 1,
    }]);
    setProducts([]);
    setProductSearch("");
    setShowProductSearch(false);
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.productId !== productId));
  };

  const updateProductQuantity = (productId, newQuantity) => {
    const qty = Math.max(1, Math.min(999, parseInt(newQuantity) || 1));
    setSelectedProducts(selectedProducts.map(p => 
      p.productId === productId ? { ...p, quantity: qty } : p
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate proforma fields if needed
    if (form.requestType === "proforma") {
      if (!form.organizationName || !form.location || selectedProducts.length === 0) {
        setError("For proforma requests, please fill in organization, location, and select at least one product.");
        return;
      }
    }
    
    try {
      setLoading(true);
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        requestType: form.requestType,
      };
      
      if (form.requestType === "proforma") {
        payload.organizationName = form.organizationName;
        payload.location = form.location;
        payload.products = selectedProducts;
      }
      
      await API.post("/messages", payload);
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

      {/* Hero */}
      <section 
        className="hero-section"
        style={{
        background: "#1d4ed8",
        backgroundImage: 'url(/images/hero1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "40px 0 50px",
        textAlign: "center",
        position: "relative",
        minHeight: "35vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 32px" }}>
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
              We're Here to Help
            </p>
            <h2 style={{ 
              color: "#ffffff", 
              fontWeight: 900, 
              fontSize: "clamp(28px, 4.5vw, 40px)", 
              margin: "0 0 12px",
              lineHeight: 1.2,
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>Get In Touch</h2>
            <p style={{ 
              color: "#ffffff", 
              fontSize: "15px", 
              lineHeight: 1.6, 
              margin: "0 auto 18px",
              maxWidth: "600px",
              opacity: 0.95,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              Product inquiries, bulk quotes, or technical support — our team is ready to help
            </p>
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
                        <option>Request Proforma</option>
                        <option>Bulk / Wholesale Order</option>
                        <option>Request a Quote</option>
                        <option>Technical Support</option>
                        <option>Order Status</option>
                        <option>Partnership Opportunity</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Proforma-specific fields */}
                  {form.requestType === "proforma" && (
                    <>
                      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                        <p style={{ fontSize: "12px", fontWeight: "700", color: "#2563eb", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>📋 Proforma Request Details</p>
                        
                        <div className="responsive-grid-form-2" style={{ gap: "12px", marginBottom: "12px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Organization / Hospital / Clinic *</label>
                            <input name="organizationName" value={form.organizationName} onChange={handleChange} required placeholder="e.g., Addis Ababa General Hospital" style={input} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Delivery Location *</label>
                            <input name="location" value={form.location} onChange={handleChange} required placeholder="e.g., Bole Sub-City, Addis Ababa" style={input} />
                          </div>
                        </div>

                        {/* Selected Products List */}
                        <div style={{ marginBottom: "12px" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Selected Products *</label>
                          {selectedProducts.length > 0 ? (
                            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                              {selectedProducts.map((p) => (
                                <div key={p.productId} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderBottom: "1px solid #f1f5f9", justifyContent: "space-between" }}>
                                  <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", margin: 0, marginBottom: "4px" }}>{p.productName}</p>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <input
                                      type="number"
                                      min="1"
                                      max="999"
                                      value={p.quantity}
                                      onChange={(e) => updateProductQuantity(p.productId, e.target.value)}
                                      placeholder="Qty"
                                      style={{ ...input, width: "60px", padding: "8px 12px", fontSize: "12px" }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeProduct(p.productId)}
                                      style={{ background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "12px", whiteSpace: "nowrap" }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ fontSize: "13px", color: "#64748b", fontStyle: "italic", margin: 0, padding: "12px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                              No products selected. Click the button below to add a product.
                            </p>
                          )}
                        </div>

                        {/* Add Product Button */}
                        <div style={{ marginBottom: "12px" }}>
                          {!showProductSearch ? (
                            <button
                              type="button"
                              onClick={() => { setShowProductSearch(true); setProductSearch(""); }}
                              style={{ width: "100%", background: "#fff", color: "#2563eb", border: "2px solid #2563eb", borderRadius: "10px", padding: "10px", fontWeight: "600", fontSize: "13px", cursor: "pointer", transition: "all 0.15s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                            >
                              + Add Another Product
                            </button>
                          ) : (
                            <div style={{ position: "relative" }}>
                              <input
                                type="text"
                                placeholder="Search for a product..."
                                value={productSearch}
                                onChange={(e) => handleProductSearch(e.target.value)}
                                autoFocus
                                style={input}
                              />
                              {products.length > 0 && (
                                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", marginTop: "4px", zIndex: 10, maxHeight: "200px", overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                                  {products.map((p) => (
                                    <button
                                      key={p._id}
                                      type="button"
                                      onClick={() => addProduct(p)}
                                      style={{ width: "100%", textAlign: "left", padding: "12px 16px", border: "none", background: "transparent", cursor: "pointer", fontSize: "13px", borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                    >
                                      <div style={{ fontWeight: "600", color: "#0f172a" }}>{p.name}</div>
                                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{p.category}</div>
                                    </button>
                                  ))}
                                </div>
                              )}
                              {productSearch && products.length === 0 && !searchingProducts && (
                                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", marginTop: "4px", padding: "12px 16px", fontSize: "13px", color: "#94a3b8", zIndex: 10 }}>
                                  No products found
                                </div>
                              )}
                              <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                                <button
                                  type="button"
                                  onClick={() => setShowProductSearch(false)}
                                  style={{ flex: 1, background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px", fontWeight: "600", fontSize: "12px", cursor: "pointer" }}
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                      Message {form.requestType === "proforma" ? "(Optional)" : "*"}
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} required={form.requestType !== "proforma"} rows={6}
                      placeholder={form.requestType === "proforma" ? "Additional details about your proforma request..." : "Tell us about your needs — what products you're looking for, your facility type, quantity required, etc."}
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
