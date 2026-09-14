import { useEffect, useState } from "react";
import API from "../services/api";

const statusConfig = {
  unread:  { background: "#eff6ff", color: "#2563eb", label: "Unread",  dot: "#3b82f6" },
  read:    { background: "#f8fafc", color: "#64748b", label: "Read",    dot: "#94a3b8" },
  replied: { background: "#f0fdf4", color: "#16a34a", label: "Replied", dot: "#22c55e" },
};

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch {
      // messages unavailable; empty state shown below
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
    setReply(msg.reply || "");
    setReplySuccess(false);

    if (msg.status === "unread") {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, status: "read" } : m))
      );
      try {
        await API.get(`/messages/${msg._id}`);
      } catch {
        // mark-as-read failed; UI already updated optimistically
      }
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    try {
      setReplying(true);
      const res = await API.post(`/messages/${selected._id}/reply`, { reply });
      setSelected(res.data.data);
      setReplySuccess(true);
      setMessages((prev) =>
        prev.map((m) => (m._id === selected._id ? res.data.data : m))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Reply failed");
    } finally {
      setReplying(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      setDeleting(id);
      await API.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === "all") return true;
    if (filter === "proforma") return m.requestType === "proforma";
    if (filter === "after_sales") return m.requestType === "after_sales_service";
    if (filter === "general") return m.requestType !== "proforma" && m.requestType !== "after_sales_service";
    return m.status === filter;
  });
  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const proformaCount = messages.filter((m) => m.requestType === "proforma").length;
  const afterSalesCount = messages.filter((m) => m.requestType === "after_sales_service").length;

  const filterBtnStyle = (active) => ({
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    background: active ? "#fff" : "transparent",
    color: active ? "#2563eb" : "#64748b",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.15s",
    textTransform: "capitalize",
  });

  const inputStyle = {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "10px 16px",
    fontSize: "14px",
    outline: "none",
    color: "#0f172a",
    background: "#fff",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
    resize: "none",
  };

  return (
    <div style={{ height: "calc(100vh - 112px)", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "16px", flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 2px" }}>
            Messages
          </h1>
          {unreadCount > 0 && (
            <p style={{ fontSize: "14px", color: "#2563eb", fontWeight: "500", margin: 0 }}>
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#f1f5f9",
          borderRadius: "12px", padding: "4px", flexWrap: "wrap" }}>
          {["all", "proforma", "after_sales", "general", "unread", "read", "replied"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={filterBtnStyle(filter === f)}>
              {f === "proforma" ? "📋 Proforma" : f === "after_sales" ? "🔧 After-Sales" : f === "general" ? "General" : f}
              {f === "unread" && unreadCount > 0 && (
                <span style={{
                  marginLeft: "6px", background: "#2563eb", color: "#fff",
                  fontSize: "11px", padding: "1px 6px", borderRadius: "999px",
                }}>
                  {unreadCount}
                </span>
              )}
              {f === "proforma" && proformaCount > 0 && (
                <span style={{
                  marginLeft: "6px", background: "#2563eb", color: "#fff",
                  fontSize: "11px", padding: "1px 6px", borderRadius: "999px",
                }}>
                  {proformaCount}
                </span>
              )}
              {f === "after_sales" && afterSalesCount > 0 && (
                <span style={{
                  marginLeft: "6px", background: "#0369a1", color: "#fff",
                  fontSize: "11px", padding: "1px 6px", borderRadius: "999px",
                }}>
                  {afterSalesCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", gap: "16px", flex: 1, minHeight: 0 }}>

        {/* Message List */}
        <div style={{ width: selected ? "300px" : "100%", flexShrink: 0,
          display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: "12px", padding: "16px",
                  border: "1px solid #f1f5f9", opacity: 0.5,
                }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", background: "#e2e8f0", borderRadius: "50%" }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ background: "#e2e8f0", height: "14px", borderRadius: "6px", width: "50%" }} />
                      <div style={{ background: "#e2e8f0", height: "12px", borderRadius: "6px", width: "75%" }} />
                    </div>
                  </div>
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div style={{
                background: "#fff", borderRadius: "12px", border: "1px solid #f1f5f9",
                padding: "48px", textAlign: "center",
              }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
                <p style={{ fontWeight: "600", color: "#374151", margin: "0 0 4px" }}>No messages</p>
                <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>
                  {filter !== "all" ? `No ${filter} messages` : "No messages yet"}
                </p>
              </div>
            ) : (
              filtered.map((msg) => {
                const s = statusConfig[msg.status] || statusConfig.read;
                const isSelected = selected?._id === msg._id;
                return (
                  <div
                    key={msg._id}
                    onClick={() => openMessage(msg)}
                    style={{
                      background: "#fff",
                      borderRadius: "12px",
                      padding: "16px",
                      cursor: "pointer",
                      border: isSelected ? "1.5px solid #2563eb" : "1px solid #f1f5f9",
                      borderLeft: msg.status === "unread" ? "4px solid #3b82f6" : (isSelected ? "1.5px solid #2563eb" : "1px solid #f1f5f9"),
                      boxShadow: isSelected ? "0 2px 12px rgba(37,99,235,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#bfdbfe";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = msg.status === "unread" ? "" : "#f1f5f9";
                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      {/* Avatar */}
                      <div style={{
                        width: "40px", height: "40px", background: msg.requestType === "proforma" ? "#fef08a" : msg.requestType === "after_sales_service" ? "#cffafe" : "#eff6ff",
                        borderRadius: "50%", display: "flex", alignItems: "center",
                        justifyContent: "center", color: msg.requestType === "proforma" ? "#ca8a04" : msg.requestType === "after_sales_service" ? "#0369a1" : "#2563eb", fontWeight: "700",
                        fontSize: "14px", flexShrink: 0,
                      }}>
                        {msg.requestType === "proforma" ? "📋" : msg.requestType === "after_sales_service" ? "🔧" : msg.name.charAt(0).toUpperCase()}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                          gap: "8px", marginBottom: "2px" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontSize: "14px", fontWeight: msg.status === "unread" ? "700" : "600",
                              color: msg.status === "unread" ? "#0f172a" : "#374151",
                              margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                              {msg.name}
                            </p>
                            {msg.requestType === "proforma" && (
                              <p style={{ fontSize: "11px", color: "#ca8a04", fontWeight: "600", margin: "1px 0 0" }}>
                                PR #{msg.proformaNumber}
                              </p>
                            )}
                            {msg.requestType === "after_sales_service" && (
                              <p style={{ fontSize: "11px", color: "#0369a1", fontWeight: "600", margin: "1px 0 0" }}>
                                SR #{msg.serviceRequestNumber}
                              </p>
                            )}
                          </div>
                          <span style={{
                            fontSize: "11px", fontWeight: "600",
                            padding: "2px 8px", borderRadius: "999px",
                            flexShrink: 0,
                            background: s.background, color: s.color,
                          }}>
                            {s.label}
                          </span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: "500",
                          margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {msg.subject}
                        </p>
                        <p style={{ fontSize: "12px", color: "#94a3b8",
                          margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {msg.message || (msg.requestType === "proforma" ? `Quantity: ${msg.quantity}` : "No message")}
                        </p>
                        <p style={{ fontSize: "11px", color: "#cbd5e1", margin: 0 }}>
                          {new Date(msg.createdAt).toLocaleDateString("en-US",
                            { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Message Detail + Reply */}
        {selected && (
          <div style={{
            flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
            background: "#fff", borderRadius: "16px",
            border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
            {/* Detail Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 24px", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px", height: "40px", background: selected.requestType === "proforma" ? "#fef08a" : selected.requestType === "after_sales_service" ? "#cffafe" : "#eff6ff",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", color: selected.requestType === "proforma" ? "#ca8a04" : selected.requestType === "after_sales_service" ? "#0369a1" : "#2563eb", fontWeight: "700", fontSize: "16px",
                }}>
                  {selected.requestType === "proforma" ? "📋" : selected.requestType === "after_sales_service" ? "🔧" : selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: "700", color: "#0f172a", margin: "0 0 2px", fontSize: "15px" }}>
                    {selected.name}
                    {selected.requestType === "proforma" && selected.proformaNumber && (
                      <span style={{ fontSize: "12px", color: "#ca8a04", fontWeight: "600", marginLeft: "8px" }}>
                        (PR #{selected.proformaNumber})
                      </span>
                    )}
                    {selected.requestType === "after_sales_service" && selected.serviceRequestNumber && (
                      <span style={{ fontSize: "12px", color: "#0369a1", fontWeight: "600", marginLeft: "8px" }}>
                        (SR #{selected.serviceRequestNumber})
                      </span>
                    )}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                    {selected.email}{selected.phone ? ` · ${selected.phone}` : ""}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "999px",
                  background: (statusConfig[selected.status] || statusConfig.read).background,
                  color: (statusConfig[selected.status] || statusConfig.read).color,
                }}>
                  {(statusConfig[selected.status] || statusConfig.read).label}
                </span>
                <button
                  onClick={() => handleDelete(selected._id)}
                  disabled={deleting === selected._id}
                  style={{
                    fontSize: "13px", color: "#f87171",
                    padding: "6px 12px", borderRadius: "8px",
                    background: "transparent", border: "none",
                    cursor: "pointer", transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  🗑 Delete
                </button>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    fontSize: "20px", fontWeight: "700", color: "#94a3b8",
                    width: "32px", height: "32px", display: "flex", alignItems: "center",
                    justifyContent: "center", borderRadius: "8px",
                    background: "transparent", border: "none", cursor: "pointer",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#374151"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {/* Subject */}
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase",
                  letterSpacing: "0.08em", marginBottom: "6px" }}>Subject</p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
                  {selected.subject}
                </p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                  Received on {new Date(selected.createdAt).toLocaleDateString("en-US",
                    { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  {" at "}
                  {new Date(selected.createdAt).toLocaleTimeString("en-US",
                    { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {/* Proforma Details */}
              {selected.requestType === "proforma" && (
                <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "#ca8a04", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                    📋 Proforma Request Details
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    {selected.organizationName && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Organization</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.organizationName}</p>
                      </div>
                    )}
                    {selected.location && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Location</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.location}</p>
                      </div>
                    )}
                  </div>

                  {/* Products - Handle both new multi-product and legacy single-product formats */}
                  <div>
                    <p style={{ fontSize: "11px", color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 8px" }}>Products</p>
                    {selected.products && Array.isArray(selected.products) && selected.products.length > 0 ? (
                      <div style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", border: "1px solid #fed7aa" }}>
                        {selected.products.map((p, idx) => (
                          <div key={idx} style={{ padding: "10px 12px", borderBottom: idx < selected.products.length - 1 ? "1px solid #fed7aa" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{p.productName}</p>
                            <span style={{ fontSize: "12px", color: "#92400e", fontWeight: "600" }}>×{p.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ) : selected.product?.productName ? (
                      <div style={{ background: "#fff", borderRadius: "8px", padding: "10px 12px", border: "1px solid #fed7aa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.product.productName}</p>
                        <span style={{ fontSize: "12px", color: "#92400e", fontWeight: "600" }}>×{selected.quantity || 1}</span>
                      </div>
                    ) : (
                      <p style={{ fontSize: "13px", color: "#92400e", margin: 0 }}>No products</p>
                    )}
                  </div>
                </div>
              )}

              {/* After-Sales Service Details */}
              {selected.requestType === "after_sales_service" && (
                <div style={{ background: "#cffafe", border: "1px solid #a5f3fc", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#0369a1", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                      🔧 Service Request Details
                    </p>
                    {selected.serviceStatus && (
                      <span style={{
                        fontSize: "11px", fontWeight: "600", padding: "4px 8px", borderRadius: "6px",
                        background: selected.serviceStatus === "new" ? "#fef3c7" : selected.serviceStatus === "in_progress" ? "#bfdbfe" : selected.serviceStatus === "scheduled" ? "#c7d2fe" : selected.serviceStatus === "completed" ? "#dcfce7" : "#fee2e2",
                        color: selected.serviceStatus === "new" ? "#92400e" : selected.serviceStatus === "in_progress" ? "#1e40af" : selected.serviceStatus === "scheduled" ? "#3730a3" : selected.serviceStatus === "completed" ? "#166534" : "#991b1b",
                        textTransform: "capitalize"
                      }}>
                        {selected.serviceStatus}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    {selected.contactPerson && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Contact Person</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.contactPerson}</p>
                      </div>
                    )}
                    {selected.organizationName && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Organization</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.organizationName}</p>
                      </div>
                    )}
                    {selected.equipment && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Equipment</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>
                          {selected.equipment}
                          {!selected.equipmentProductId && <span style={{ fontSize: "11px", color: "#64748b", marginLeft: "6px", fontStyle: "italic" }}>(manual)</span>}
                        </p>
                      </div>
                    )}
                    {selected.serviceType && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Service Type</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0, textTransform: "capitalize" }}>{selected.serviceType}</p>
                      </div>
                    )}
                    {selected.serialNumber && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Serial Number</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.serialNumber}</p>
                      </div>
                    )}
                    {selected.purchaseDate && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Purchase Date</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{new Date(selected.purchaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                      </div>
                    )}
                    {selected.preferredServiceDate && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Preferred Service Date</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{new Date(selected.preferredServiceDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                      </div>
                    )}
                    {selected.serviceLocation && (
                      <div>
                        <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 4px" }}>Service Location</p>
                        <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "500", margin: 0 }}>{selected.serviceLocation}</p>
                      </div>
                    )}
                  </div>

                  {selected.serviceDescription && (
                    <div>
                      <p style={{ fontSize: "11px", color: "#0c4a6e", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", margin: "0 0 6px" }}>Description</p>
                      <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: "400", margin: 0, lineHeight: "1.5", whiteSpace: "pre-wrap" }}>{selected.serviceDescription}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Original Message */}
              <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase",
                  letterSpacing: "0.08em", fontWeight: "600", marginBottom: "12px" }}>Message</p>
                <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7",
                  whiteSpace: "pre-wrap", margin: 0 }}>
                  {selected.message}
                </p>
              </div>

              {/* Previous Reply */}
              {selected.status === "replied" && selected.reply && (
                <div style={{
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                  borderRadius: "12px", padding: "20px", marginBottom: "24px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb",
                      textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Your Reply
                    </span>
                    <span style={{ fontSize: "12px", color: "#93c5fd" }}>
                      · {selected.repliedAt
                        ? new Date(selected.repliedAt).toLocaleDateString("en-US",
                          { month: "short", day: "numeric" })
                        : ""}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7",
                    whiteSpace: "pre-wrap", margin: 0 }}>
                    {selected.reply}
                  </p>
                </div>
              )}

              {/* Reply Form */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
                  {selected.status === "replied" ? "Send Another Reply" : `Reply to ${selected.name}`}
                </p>

                {replySuccess && (
                  <div style={{
                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                    color: "#16a34a", padding: "12px 16px", borderRadius: "10px",
                    marginBottom: "12px", fontSize: "14px",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    ✓ Reply sent successfully
                    {process.env.NODE_ENV !== "production" ? " (email sent if configured)" : ""}
                  </div>
                )}

                <form onSubmit={handleReply} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{
                    background: "#f8fafc", borderRadius: "10px", padding: "10px 16px",
                    fontSize: "14px", color: "#64748b",
                    border: "1px solid #e2e8f0",
                  }}>
                    To: <span style={{ color: "#0f172a", fontWeight: "500" }}>{selected.email}</span>
                  </div>
                  <textarea
                    value={reply}
                    onChange={(e) => { setReply(e.target.value); setReplySuccess(false); }}
                    rows="5"
                    placeholder={`Write your reply to ${selected.name}${selected.requestType === "proforma" ? " regarding their proforma request" : selected.requestType === "after_sales_service" ? " regarding their service request" : ""}...`}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                  />
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      type="submit"
                      disabled={replying || !reply.trim()}
                      style={{
                        background: "#2563eb", color: "#fff",
                        padding: "10px 24px", borderRadius: "12px",
                        fontSize: "14px", fontWeight: "600",
                        border: "none", cursor: replying || !reply.trim() ? "not-allowed" : "pointer",
                        opacity: replying || !reply.trim() ? 0.6 : 1,
                        display: "flex", alignItems: "center", gap: "8px",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { if (!replying && reply.trim()) e.currentTarget.style.background = "#1d4ed8"; }}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
                    >
                      {replying ? "Sending..." : "✉ Send Reply"}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setReply(""); setReplySuccess(false); }}
                      style={{
                        background: "#fff", color: "#64748b",
                        padding: "10px 16px", borderRadius: "12px",
                        fontSize: "14px", border: "1px solid #e2e8f0",
                        cursor: "pointer", transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Empty state when nothing selected */}
        {!selected && !loading && filtered.length > 0 && (
          <div style={{
            flex: 1, background: "#fff", borderRadius: "16px",
            border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center", padding: "48px",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💬</div>
            <p style={{ fontWeight: "600", color: "#374151", fontSize: "18px", margin: "0 0 4px" }}>
              Select a message
            </p>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>
              Click on a message from the list to read and reply
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
