import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const statusStyles = {
  Pending:    { color: "#d97706", background: "#fffbeb" },
  Processing: { color: "#2563eb", background: "#eff6ff" },
  Shipped:    { color: "#7c3aed", background: "#f5f3ff" },
  Delivered:  { color: "#16a34a", background: "#f0fdf4" },
  Cancelled:  { color: "#dc2626", background: "#fef2f2" },
};

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [updating, setUpdating] = useState(null);
  const [notice, setNotice] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
      const init = {};
      res.data.forEach((o) => (init[o._id] = o.orderStatus));
      setSelectedStatus(init);
    } catch {
      // orders unavailable; empty state shown below
    }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id) => {
    try {
      setUpdating(id);
      setNotice("");
      const res = await API.put(`/orders/${id}`, { status: selectedStatus[id] });
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, orderStatus: selectedStatus[id] } : o));
      setNotice(res.data.message || "Order status updated.");
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "All" || o.orderStatus === filterStatus;
    const matchSearch = !search ||
      o.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o._id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  };

  const thStyle = {
    padding: "12px 20px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "600",
    color: "#94a3b8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const filterBtnStyle = (active) => ({
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    background: active ? "#fff" : "transparent",
    color: active ? "#2563eb" : "#64748b",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.15s",
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
            Orders
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            {orders.length} total orders
          </p>
        </div>
      </div>

      {notice && (
        <div style={{
          marginBottom: "16px",
          padding: "12px 16px",
          borderRadius: "12px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          color: "#15803d",
          fontSize: "13px",
          fontWeight: 600,
        }}>
          ✓ {notice}
        </div>
      )}

      {/* Filters */}
      <div style={{ ...cardStyle, padding: "16px", marginBottom: "20px",
        display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by customer name or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: "200px",
            border: "1px solid #e2e8f0", borderRadius: "12px",
            padding: "8px 16px", fontSize: "14px",
            outline: "none", color: "#0f172a", background: "#fff",
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
          onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
        />
        <div style={{ display: "flex", gap: "4px", background: "#f1f5f9",
          borderRadius: "12px", padding: "4px" }}>
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} style={filterBtnStyle(filterStatus === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ background: "#f1f5f9", height: "56px", borderRadius: "12px" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🧾</div>
            <p style={{ fontWeight: "600", color: "#374151" }}>No orders found</p>
          </div>
        ) : (
          <div className="table-scroll">
          <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse", minWidth: "720px" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              <tr>
                <th style={thStyle}>Order</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => (
                <tr key={order._id}
                  style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #f8fafc" : "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <p style={{ fontWeight: "700", color: "#0f172a", fontFamily: "monospace",
                      fontSize: "12px", margin: "0 0 2px" }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      {new Date(order.createdAt).toLocaleDateString("en-US",
                        { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <p style={{ fontWeight: "600", color: "#0f172a", margin: "0 0 2px" }}>
                      {order.customer?.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      {order.customer?.email}
                    </p>
                  </td>
                  <td style={{ padding: "14px 20px", maxWidth: "160px" }}>
                    {order.items?.slice(0, 2).map((item, i) => (
                      <p key={i} style={{ fontSize: "12px", color: "#64748b", margin: "0 0 2px",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name} ×{item.quantity}
                      </p>
                    ))}
                    {order.items?.length > 2 && (
                      <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                        +{order.items.length - 2} more
                      </p>
                    )}
                  </td>
                  <td style={{ padding: "14px 20px", fontWeight: "700", color: "#0f172a" }}>
                    ETB {order.totalAmount?.toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      padding: "4px 10px", borderRadius: "999px",
                      fontSize: "12px", fontWeight: "600",
                      background: order.paymentStatus === "Paid" ? "#f0fdf4" : "#fffbeb",
                      color: order.paymentStatus === "Paid" ? "#16a34a" : "#d97706",
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                      <select
                        value={selectedStatus[order._id] || order.orderStatus}
                        onChange={(e) => setSelectedStatus((prev) => ({ ...prev, [order._id]: e.target.value }))}
                        style={{
                          border: "1px solid #e2e8f0", borderRadius: "8px",
                          padding: "6px 8px", fontSize: "12px",
                          outline: "none", background: "#fff", color: "#0f172a",
                        }}
                      >
                        {Object.keys(statusStyles).map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <button
                        onClick={() => updateStatus(order._id)}
                        disabled={updating === order._id}
                        style={{
                          background: "#2563eb", color: "#fff",
                          padding: "6px 10px", borderRadius: "8px",
                          fontSize: "12px", fontWeight: "600",
                          border: "none", cursor: "pointer",
                          opacity: updating === order._id ? 0.6 : 1,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => { if (updating !== order._id) e.currentTarget.style.background = "#1d4ed8"; }}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
                      >
                        {updating === order._id ? "↻" : "Save"}
                      </button>
                    </div>
                    <span style={{
                      padding: "3px 8px", borderRadius: "999px",
                      fontSize: "11px", fontWeight: "600",
                      ...(statusStyles[order.orderStatus] || { color: "#64748b", background: "#f8fafc" }),
                    }}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <Link
                      to={`/admin/orders/${order._id}`}
                      style={{
                        background: "#f1f5f9", color: "#374151",
                        padding: "6px 12px", borderRadius: "8px",
                        fontSize: "12px", fontWeight: "600",
                        textDecoration: "none", transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#e2e8f0"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#f1f5f9"}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageOrders;
