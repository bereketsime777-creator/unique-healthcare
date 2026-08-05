import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const statusStyles = {
  Pending:    { color: "#d97706", background: "#fffbeb" },
  Processing: { color: "#2563eb", background: "#eff6ff" },
  Shipped:    { color: "#7c3aed", background: "#f5f3ff" },
  Delivered:  { color: "#16a34a", background: "#f0fdf4" },
  Cancelled:  { color: "#dc2626", background: "#fef2f2" },
};

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then((r) => setOrder(r.data))
      .catch(() => setError("Failed to load order."))
      .finally(() => setLoading(false));
  }, [id]);

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    padding: "20px",
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ ...cardStyle, height: "128px", opacity: 0.4 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ ...cardStyle, height: "160px", opacity: 0.4 }} />
          <div style={{ ...cardStyle, height: "160px", opacity: 0.4 }} />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>😕</div>
        <p style={{ color: "#dc2626", fontWeight: "600", marginBottom: "16px" }}>
          {error || "Order not found."}
        </p>
        <button onClick={() => navigate("/admin/orders")}
          style={{
            background: "#2563eb", color: "#fff",
            padding: "10px 24px", borderRadius: "12px",
            fontSize: "14px", fontWeight: "600",
            border: "none", cursor: "pointer",
          }}>
          ← Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
            Order Details
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", fontFamily: "monospace", margin: 0 }}>
            #{order._id.slice(-10).toUpperCase()}
          </p>
        </div>
        <button onClick={() => navigate("/admin/orders")}
          style={{
            fontSize: "14px", color: "#64748b", background: "transparent",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#2563eb"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#64748b"}
        >
          ← Back to Orders
        </button>
      </div>

      {/* Status Banner */}
      <div style={{ ...cardStyle, marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "6px" }}>Order Status</p>
          <span style={{
            padding: "6px 14px", borderRadius: "999px", fontSize: "14px", fontWeight: "700",
            ...(statusStyles[order.orderStatus] || { color: "#64748b", background: "#f8fafc" }),
          }}>
            {order.orderStatus}
          </span>
        </div>
        <div>
          <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "6px" }}>Payment</p>
          <span style={{
            padding: "6px 14px", borderRadius: "999px", fontSize: "14px", fontWeight: "700",
            background: order.paymentStatus === "Paid" ? "#f0fdf4" : "#fffbeb",
            color: order.paymentStatus === "Paid" ? "#16a34a" : "#d97706",
          }}>
            {order.paymentStatus}
          </span>
        </div>
        <div>
          <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "6px" }}>Date Placed</p>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", margin: 0 }}>
            {new Date(order.createdAt).toLocaleDateString("en-US",
              { weekday: "short", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "6px" }}>Order Total</p>
          <p style={{ fontSize: "26px", fontWeight: "800", color: "#2563eb", margin: 0 }}>
            ETB {order.totalAmount?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Customer + Shipping */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Customer */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "16px",
            display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
            <span style={{ width: "28px", height: "28px", background: "#eff6ff", borderRadius: "8px",
              display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>👤</span>
            Customer
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Name",  value: order.customer?.name },
              { label: "Email", value: order.customer?.email },
              { label: "Phone", value: order.customer?.phone || "N/A" },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#94a3b8" }}>{r.label}</span>
                <span style={{ fontWeight: "500", color: "#0f172a" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "16px",
            display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
            <span style={{ width: "28px", height: "28px", background: "#f5f3ff", borderRadius: "8px",
              display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>📍</span>
            Shipping Address
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Name",     value: order.shippingAddress?.fullName },
              { label: "Phone",    value: order.shippingAddress?.phone },
              { label: "City",     value: order.shippingAddress?.city },
              { label: "Sub City", value: order.shippingAddress?.subCity },
              { label: "Address",  value: order.shippingAddress?.address },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between",
                fontSize: "14px", gap: "16px" }}>
                <span style={{ color: "#94a3b8", flexShrink: 0 }}>{r.label}</span>
                <span style={{ fontWeight: "500", color: "#0f172a", textAlign: "right" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ordered Items */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "28px", height: "28px", background: "#fef3c7", borderRadius: "8px",
            display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>📦</span>
          <h2 style={{ fontWeight: "700", color: "#0f172a", fontSize: "15px", margin: 0 }}>
            Ordered Items
          </h2>
        </div>
        <div>
          {order.items?.map((item, index) => (
            <div key={index} style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "16px 20px",
              borderBottom: index < order.items.length - 1 ? "1px solid #f8fafc" : "none",
            }}>
              <div style={{
                width: "56px", height: "56px", background: "#f8fafc",
                borderRadius: "12px", overflow: "hidden",
                border: "1px solid #f1f5f9", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {item.image ? (
                  <img src={item.image} alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "20px" }}>📦</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px", margin: "0 0 4px" }}>
                  {item.name}
                </p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                  ETB {item.price?.toLocaleString()} × {item.quantity}
                </p>
              </div>
              <p style={{ fontWeight: "700", color: "#0f172a", margin: 0 }}>
                ETB {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 20px", background: "#f8fafc", borderTop: "1px solid #f1f5f9",
          display: "flex", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "20px", fontWeight: "800", color: "#2563eb", margin: 0 }}>
            Total: ETB {order.totalAmount?.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
