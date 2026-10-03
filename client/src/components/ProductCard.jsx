import { Link } from "react-router-dom";
import { getSafeOptimizedImage } from "../utils/imageOptimizer";

function ProductCard({ product }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 16px 32px rgba(37, 99, 235, 0.12)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      {/* Image Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          background: "linear-gradient(135deg, #f0f4f8 0%, #e8eef8 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {product.image && product.image.startsWith("http") ? (
          <img
            src={getSafeOptimizedImage(product.image, "card")}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = "flex";
              }
            }}
          />
        ) : null}

        {/* Placeholder when no image */}
        <div
          style={{
            display:
              product.image && product.image.startsWith("http")
                ? "none"
                : "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f0f4f8 0%, #e8eef8 100%)",
            color: "#cbd5e1",
          }}
        >
          <svg
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ opacity: 0.5, marginBottom: "8px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span style={{ fontSize: "12px" }}>No image</span>
        </div>

        {/* Stock Status Badge */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background:
              product.stock > 0
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <span>{product.stock > 0 ? "✓" : "✕"}</span>
          {product.stock > 0 ? "In Stock" : "Out"}
        </div>
      </div>

      {/* Content Section */}
      <div
        style={{
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Category Badge */}
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #dbeafe, #e0e7ff)",
              color: "#1e40af",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              padding: "5px 10px",
              borderRadius: "6px",
              border: "1px solid rgba(37, 99, 235, 0.2)",
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: "15px",
            fontWeight: "700",
            color: "#1f2937",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </h3>

        {/* Manufacturer */}
        {product.manufacturer && (
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "13px",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            <strong style={{ color: "#475569" }}>By:</strong> {product.manufacturer}
          </p>
        )}

        {/* Model */}
        {product.model && (
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "12px",
              color: "#94a3b8",
              fontFamily: '"Courier New", monospace',
            }}
          >
            Model: {product.model}
          </p>
        )}

        {/* Compliance Badges */}
        {(product.compliance?.EFDA || product.compliance?.CE || product.compliance?.FDA) && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom: "12px",
              marginTop: "4px",
            }}
          >
            {product.compliance?.EFDA && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "4px 8px",
                  background: "#fef08a",
                  color: "#854d0e",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: "700",
                  border: "1px solid #fcd34d",
                  title: "Ethiopian Food and Drug Authority",
                }}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.267 2.693H3.462a1 1 0 01-.267-2.693v-6.757a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                EFDA
              </div>
            )}
            {product.compliance?.CE && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "4px 8px",
                  background: "#dbeafe",
                  color: "#0c4a6e",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: "700",
                  border: "1px solid #bfdbfe",
                  title: "European Conformity",
                }}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.267 2.693H3.462a1 1 0 01-.267-2.693v-6.757a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                CE
              </div>
            )}
            {product.compliance?.FDA && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "4px 8px",
                  background: "#e9d5ff",
                  color: "#581c87",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: "700",
                  border: "1px solid #d8b4fe",
                  title: "FDA Approved",
                }}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.267 2.693H3.462a1 1 0 01-.267-2.693v-6.757a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                FDA
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
            margin: "12px 0",
            flex: 1,
          }}
        />

        {/* Price Section */}
        <div style={{ marginBottom: "14px" }}>
          {product.priceType === "quote" ? (
            <div
              style={{
                background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#0c4a6e",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "3px",
                }}
              >
                Pricing Model
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#2563eb",
                }}
              >
                Request Quote
              </p>
            </div>
          ) : (
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Price
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#2563eb",
                }}
              >
                ETB {product.price?.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <Link
            to={`/products/${product._id}`}
            style={{
              flex: 1,
              padding: "10px 14px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              border: "1px solid rgba(37, 99, 235, 0.3)",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              textDecoration: "none",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #1d4ed8, #1e40af)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 16px rgba(37, 99, 235, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #2563eb, #1d4ed8)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View Details
          </Link>

          {product.priceType === "quote" ? (
            <Link
              to={`/contact?subject=Request a Quote&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "#f0f4f8",
                color: "#2563eb",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e0e7ff";
                e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f0f4f8";
                e.currentTarget.style.borderColor = "#bfdbfe";
              }}
            >
              Request Quote
            </Link>
          ) : (
            <>
              {product.stock > 0 && (
                <button
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#fff",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "700",
                    textDecoration: "none",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #059669, #047857)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(16, 185, 129, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #10b981, #059669)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Add to Cart
                </button>
              )}
              <Link
                to={`/contact?subject=Request Information&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "#f0f4f8",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e0e7ff";
                  e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f0f4f8";
                  e.currentTarget.style.borderColor = "#bfdbfe";
                }}
              >
                Request Info
              </Link>
            </>
          )}
        </div>

        {/* Trust Indicators */}
        <div
          style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {[
            { icon: "✓", text: "Genuine" },
            { icon: "🚚", text: "Fast Delivery" },
          ].map((item) => (
            <div
              key={item.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#64748b",
                fontWeight: 600,
                background: "#f8fafc",
                padding: "6px 8px",
                borderRadius: "6px",
              }}
            >
              <span style={{ fontSize: "13px" }}>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;