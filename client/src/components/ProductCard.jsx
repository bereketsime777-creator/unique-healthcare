function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "280px",
      }}
    >

      <img
        src={product.image || "https://via.placeholder.com/250"}
        alt={product.name}
        width="100%"
        height="200"
        style={{
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>
        {product.name}
      </h3>

      <p>
        Category: {product.category}
      </p>

      <p>
        Manufacturer: {product.manufacturer}
      </p>

      {product.model && (
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Models: {product.model}
        </p>
      )}

      <h4>
        ETB {product.price}
      </h4>

    </div>
  );
}

export default ProductCard;