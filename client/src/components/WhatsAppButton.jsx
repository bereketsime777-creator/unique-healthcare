import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../constants/contact";

export default function WhatsAppButton() {
  const location = useLocation();
  const [productName, setProductName] = useState(null);
  const [message, setMessage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  // Fetch product name if on product details page
  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/products\/(.+)$/);
    if (pathMatch) {
      const productId = pathMatch[1];
      API.get(`/products/${productId}`)
        .then((res) => {
          if (res.data?.name) {
            setProductName(res.data.name);
          }
        })
        .catch(() => {
          // Silently fail - use default message
          setProductName(null);
        });
    } else {
      setProductName(null);
    }
  }, [location.pathname]);

  // Build message based on context
  useEffect(() => {
    if (productName) {
      setMessage(
        encodeURIComponent(
          `Hello Unique Healthcare, I am interested in ${productName}. I would like more information.`
        )
      );
    } else {
      setMessage(
        encodeURIComponent(
          "Hello Unique Healthcare, I would like more information about your products and services."
        )
      );
    }
  }, [productName]);

  if (!message) return null;

  // Extract phone number and remove + for WhatsApp URL
  const phoneNumber = CONTACT.phones[0].tel.replace(/\+/g, "");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Unique Healthcare on WhatsApp"
      title="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "56px",
        height: "56px",
        background: "#25d366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "28px",
        zIndex: 50,
        boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
        transition: "all 0.3s ease",
        textDecoration: "none",
        border: "none",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        // Ensure link opens in new tab/window
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          window.open(whatsappUrl, "_blank", "width=600,height=700");
        }
      }}
    >
      <FaWhatsapp
        style={{
          filter: isHovering ? "brightness(1.1)" : "brightness(1)",
          transform: isHovering ? "scale(1.1)" : "scale(1)",
          transition: "all 0.2s ease",
        }}
      />

      {/* Mobile: smaller size and adjusted position */}
      <style>{`
        @media (max-width: 768px) {
          [aria-label="Chat with Unique Healthcare on WhatsApp"] {
            bottom: 20px !important;
            right: 20px !important;
            width: 48px !important;
            height: 48px !important;
            font-size: 24px !important;
          }
        }

        @media (max-width: 480px) {
          [aria-label="Chat with Unique Healthcare on WhatsApp"] {
            bottom: 16px !important;
            right: 16px !important;
            width: 44px !important;
            height: 44px !important;
            font-size: 20px !important;
          }
        }
      `}</style>
    </a>
  );
}
