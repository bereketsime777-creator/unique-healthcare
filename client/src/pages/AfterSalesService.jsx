import { useState } from "react";
import API from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";

const info = [
  { icon: "🔧", title: "After-Sales Support", desc: "We provide complete after-sales service for all equipment." },
  { icon: "⚡", title: "Fast Response", desc: "Request submitted, response within 24 hours." },
  { icon: "💼", title: "Professional Service", desc: "Our certified technicians handle all service requests." },
  { icon: "📞", title: "Easy Communication", desc: "Track your service request status anytime." },
];

export default function AfterSalesService() {
  const { language } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "After-Sales Service Request",
    message: "",
    requestType: "after_sales_service",
    contactPerson: "",
    organizationName: "",
    serviceType: "",
    serialNumber: "",
    purchaseDate: "",
    preferredServiceDate: "",
    serviceDescription: "",
    serviceLocation: "",
  });

  const [selectedEquipment, setSelectedEquipment] = useState({
    equipmentProductId: null,
    equipment: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [searchingProducts, setSearchingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [showEquipmentSearch, setShowEquipmentSearch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  // Equipment search and selection
  const handleEquipmentSearch = async (query) => {
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
      console.error("Equipment search failed:", err);
      setProducts([]);
    } finally {
      setSearchingProducts(false);
    }
  };

  const selectEquipment = (product) => {
    setSelectedEquipment({
      equipmentProductId: product._id,
      equipment: product.name,
    });
    setProducts([]);
    setProductSearch("");
    setShowEquipmentSearch(false);
  };

  const enterManualEquipment = (equipmentName) => {
    if (!equipmentName || !equipmentName.trim()) {
      setError("Please enter equipment name");
      return;
    }

    setSelectedEquipment({
      equipmentProductId: null,
      equipment: equipmentName.trim(),
    });
    setProducts([]);
    setProductSearch("");
    setShowEquipmentSearch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (
      !form.contactPerson ||
      !form.serviceType ||
      !selectedEquipment.equipment ||
      !form.serviceDescription ||
      !form.serviceLocation
    ) {
      setError("Please fill in all required fields: contact person, service type, equipment, description, and location.");
      return;
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
        contactPerson: form.contactPerson,
        organizationName: form.organizationName,
        serviceType: form.serviceType,
        equipment: selectedEquipment.equipment,
        equipmentProductId: selectedEquipment.equipmentProductId,
        serialNumber: form.serialNumber,
        purchaseDate: form.purchaseDate,
        preferredServiceDate: form.preferredServiceDate,
        serviceDescription: form.serviceDescription,
        serviceLocation: form.serviceLocation,
      };

      const res = await API.post("/messages", payload);
      setSubmitted(true);
      setSubmittedData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
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
          background: "#0369a1",
          backgroundImage: "url(/images/hero1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 0 50px",
          textAlign: "center",
          position: "relative",
          minHeight: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 32px" }}>
          <div className="hero-content">
            <p
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "14px",
                opacity: 0.9,
              }}
            >
              🔧 After-Sales Support
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "clamp(28px, 4.5vw, 40px)",
                margin: "0 0 12px",
                lineHeight: 1.2,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Service Request
            </h2>
            <p
              style={{
                color: "#ffffff",
                fontSize: "15px",
                lineHeight: 1.6,
                margin: "0 auto 18px",
                maxWidth: "600px",
                opacity: 0.95,
                textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              Need maintenance, repair, or installation support? Submit your service request and our team will respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "float 2s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "42px",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "8px",
                background: "rgba(255,255,255,0.8)",
                borderRadius: "3px",
                position: "absolute",
                top: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                animation: "scroll-indicator 1.5s infinite",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="page-wrap">
          <div className="responsive-grid-1-2">
            {/* Info cards */}
            <div>
              <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "20px", margin: "0 0 20px" }}>
                Why Submit a Service Request?
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {info.map((c) => (
                  <div
                    key={c.title}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #7dd3fc",
                      borderRadius: "16px",
                      padding: "18px 20px",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "14px", margin: "0 0 4px" }}>
                        {c.title}
                      </p>
                      <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Request Form */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #f1f5f9",
                borderRadius: "20px",
                padding: "clamp(20px, 4vw, 36px)",
              }}
            >
              <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "20px", margin: "0 0 6px" }}>
                Submit Service Request
              </h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 28px" }}>
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
                  <h3 style={{ color: "#0f172a", fontWeight: 800, fontSize: "22px", margin: "0 0 8px" }}>
                    Service Request Submitted!
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 6px" }}>
                    Thank you for submitting your service request.
                  </p>
                  {submittedData?.serviceRequestNumber && (
                    <p
                      style={{
                        color: "#0369a1",
                        fontSize: "16px",
                        fontWeight: 700,
                        margin: "0 0 24px",
                        backgroundColor: "#dbeafe",
                        padding: "12px 16px",
                        borderRadius: "8px",
                      }}
                    >
                      Your SR#: <strong>{submittedData.serviceRequestNumber}</strong>
                    </p>
                  )}
                  <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
                    We will contact you within 24 hours. Keep your SR# for reference.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "After-Sales Service Request",
                        message: "",
                        requestType: "after_sales_service",
                        contactPerson: "",
                        organizationName: "",
                        serviceType: "",
                        serialNumber: "",
                        purchaseDate: "",
                        preferredServiceDate: "",
                        serviceDescription: "",
                        serviceLocation: "",
                      });
                      setSelectedEquipment({
                        equipmentProductId: null,
                        equipment: "",
                      });
                      setSubmittedData(null);
                    }}
                    style={{
                      background: "#0369a1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50px",
                      padding: "12px 28px",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div
                      style={{
                        background: "#fff1f2",
                        border: "1px solid #fecdd3",
                        color: "#e11d48",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "13px",
                        marginBottom: "20px",
                      }}
                    >
                      ⚠ {error}
                    </div>
                  )}

                  <div className="responsive-grid-form-2" style={{ marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        style={input}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@hospital.com"
                        style={input}
                      />
                    </div>
                  </div>

                  <div className="responsive-grid-form-2" style={{ marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+251 9XX XXX XXX"
                        style={input}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Contact Person *
                      </label>
                      <input
                        name="contactPerson"
                        value={form.contactPerson}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Dr. Abebe"
                        style={input}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                      Organization / Hospital / Clinic *
                    </label>
                    <input
                      name="organizationName"
                      value={form.organizationName}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Addis Ababa General Hospital"
                      style={input}
                    />
                  </div>

                  <div className="responsive-grid-form-2" style={{ marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Service Type *
                      </label>
                      <select name="serviceType" value={form.serviceType} onChange={handleChange} required style={{ ...input }}>
                        <option value="">Select service type</option>
                        <option value="installation">Installation</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="repair">Repair</option>
                        <option value="troubleshooting">Troubleshooting</option>
                        <option value="training">Training</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Serial Number
                      </label>
                      <input
                        name="serialNumber"
                        value={form.serialNumber}
                        onChange={handleChange}
                        placeholder="e.g., SN-2024-1234"
                        style={input}
                      />
                    </div>
                  </div>

                  {/* Equipment Search */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                      Equipment / Product *
                    </label>
                    {selectedEquipment.equipment ? (
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          padding: "12px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", margin: 0, marginBottom: "2px" }}>
                            {selectedEquipment.equipment}
                          </p>
                          {!selectedEquipment.equipmentProductId && (
                            <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, fontStyle: "italic" }}>(manually entered)</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEquipment({ equipmentProductId: null, equipment: "" });
                            setProductSearch("");
                            setShowEquipmentSearch(false);
                          }}
                          style={{
                            background: "#fff1f2",
                            color: "#e11d48",
                            border: "1px solid #fecdd3",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                        >
                          Change
                        </button>
                      </div>
                    ) : !showEquipmentSearch ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowEquipmentSearch(true);
                          setProductSearch("");
                        }}
                        style={{
                          width: "100%",
                          background: "#fff",
                          color: "#0369a1",
                          border: "2px solid #0369a1",
                          borderRadius: "10px",
                          padding: "10px",
                          fontWeight: "600",
                          fontSize: "13px",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#dbeafe";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fff";
                        }}
                      >
                        + Select Equipment
                      </button>
                    ) : (
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="Search equipment or type product name..."
                          value={productSearch}
                          onChange={(e) => handleEquipmentSearch(e.target.value)}
                          autoFocus
                          style={input}
                        />
                        {products.length > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              background: "#fff",
                              border: "1px solid #e2e8f0",
                              borderRadius: "12px",
                              marginTop: "4px",
                              zIndex: 10,
                              maxHeight: "200px",
                              overflowY: "auto",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          >
                            {products.map((p) => (
                              <button
                                key={p._id}
                                type="button"
                                onClick={() => selectEquipment(p)}
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  padding: "12px 16px",
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  borderBottom: "1px solid #f1f5f9",
                                  transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                <div style={{ fontWeight: "600", color: "#0f172a" }}>{p.name}</div>
                                <div style={{ fontSize: "12px", color: "#94a3b8" }}>{p.category}</div>
                              </button>
                            ))}
                          </div>
                        )}
                        {productSearch && products.length === 0 && !searchingProducts && (
                          <div style={{ marginTop: "8px", padding: "12px", background: "#dbeafe", border: "1px solid #7dd3fc", borderRadius: "8px" }}>
                            <p style={{ fontSize: "13px", color: "#0369a1", margin: 0, marginBottom: "8px" }}>
                              No matching equipment. Add "{productSearch}" manually:
                            </p>
                            <button
                              type="button"
                              onClick={() => enterManualEquipment(productSearch)}
                              style={{
                                width: "100%",
                                background: "#0369a1",
                                color: "#fff",
                                border: "none",
                                padding: "10px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                fontSize: "13px",
                                cursor: "pointer",
                              }}
                            >
                              Add "{productSearch}"
                            </button>
                          </div>
                        )}
                        <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (productSearch.trim()) {
                                enterManualEquipment(productSearch);
                              } else {
                                setShowEquipmentSearch(false);
                              }
                            }}
                            style={{
                              flex: 1,
                              background: "#0369a1",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              padding: "8px",
                              fontWeight: "600",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            {productSearch.trim() ? "Add as Manual Equipment" : "Done"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowEquipmentSearch(false)}
                            style={{
                              flex: 1,
                              background: "#f1f5f9",
                              color: "#64748b",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              padding: "8px",
                              fontWeight: "600",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="responsive-grid-form-2" style={{ marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Purchase Date
                      </label>
                      <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} style={input} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                        Preferred Service Date
                      </label>
                      <input
                        type="date"
                        name="preferredServiceDate"
                        value={form.preferredServiceDate}
                        onChange={handleChange}
                        style={input}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                      Service Location *
                    </label>
                    <input
                      name="serviceLocation"
                      value={form.serviceLocation}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Bole Sub-City, Addis Ababa"
                      style={input}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                      Service Description / Issue *
                    </label>
                    <textarea
                      name="serviceDescription"
                      value={form.serviceDescription}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe the issue, maintenance needed, or service required..."
                      style={{ ...input, resize: "vertical", lineHeight: 1.6 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      background: "#0369a1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50px",
                      padding: "14px",
                      fontWeight: 700,
                      fontSize: "15px",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      fontFamily: "inherit",
                    }}
                  >
                    {loading ? "↻  Submitting..." : "Submit Service Request →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info section */}
      <section style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "48px 0" }}>
        <div className="page-wrap">
          <div className="responsive-grid-4" style={{ gap: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>⚡</div>
              <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>
                Fast Response
              </p>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>Within 24 hours</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>🔧</div>
              <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>
                Professional Team
              </p>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>Certified technicians</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>📋</div>
              <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>
                Track Request
              </p>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>Use your SR# anytime</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>📞</div>
              <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "15px", margin: "0 0 4px" }}>
                Get Support
              </p>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>Anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
