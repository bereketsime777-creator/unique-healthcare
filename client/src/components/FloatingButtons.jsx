import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { CONTACT } from "../constants/contact";

export default function FloatingButtons() {
  const location = useLocation();
  const [productName, setProductName] = useState(null);
  const [whatsappMessage, setWhatsappMessage] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

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
          setProductName(null);
        });
    } else {
      setProductName(null);
    }
  }, [location.pathname]);

  // Build WhatsApp message based on context
  useEffect(() => {
    if (productName) {
      setWhatsappMessage(
        encodeURIComponent(
          `Hello Unique Healthcare, I am interested in ${productName}. I would like more information.`
        )
      );
    } else {
      setWhatsappMessage(
        encodeURIComponent(
          "Hello Unique Healthcare, I would like more information about your products and services."
        )
      );
    }
  }, [productName]);

  // Handle scroll for Back-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Back-to-Top click
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!whatsappMessage) return null;

  // Extract phone number and remove + for WhatsApp URL
  const phoneNumber = CONTACT.phones[0].tel.replace(/\+/g, "");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  // Common button styles
  const baseButtonStyle = {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "24px",
    zIndex: 50,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  // Button specific styles
  const buttonStyles = {
    whatsapp: {
      ...baseButtonStyle,
      background: "#25d366",
      boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
      bottom: "24px",
    },
    backToTop: {
      ...baseButtonStyle,
      background: "#8b5cf6",
      boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
      bottom: "92px",
      opacity: showBackToTop ? 1 : 0,
      pointerEvents: showBackToTop ? "auto" : "none",
      transition: "all 0.3s ease",
    },
  };

  // Icon styling based on hover state
  const getIconStyle = (buttonName) => ({
    filter: hoveredButton === buttonName ? "brightness(1.1)" : "brightness(1)",
    transform: hoveredButton === buttonName ? "scale(1.1)" : "scale(1)",
    transition: "all 0.2s ease",
  });

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Unique Healthcare on WhatsApp"
        title="Chat with us on WhatsApp"
        style={{
          ...buttonStyles.whatsapp,
          position: "fixed",
          right: "24px",
        }}
        onMouseEnter={() => setHoveredButton("whatsapp")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.open(whatsappUrl, "_blank", "width=600,height=700");
          }
        }}
      >
        <FaWhatsapp style={getIconStyle("whatsapp")} />
      </a>

      {/* Back-to-Top Button */}
      <button
        onClick={handleBackToTop}
        aria-label="Back to top"
        title="Back to top"
        style={{
          ...buttonStyles.backToTop,
          position: "fixed",
          right: "24px",
        }}
        onMouseEnter={() => setHoveredButton("backToTop")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <FaArrowUp style={getIconStyle("backToTop")} />
      </button>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          [aria-label="Chat with Unique Healthcare on WhatsApp"],
          [aria-label="Back to top"] {
            width: 48px !important;
            height: 48px !important;
            font-size: 20px !important;
            bottom: auto !important;
            right: 20px !important;
          }

          [aria-label="Chat with Unique Healthcare on WhatsApp"] {
            bottom: 20px !important;
          }

          [aria-label="Back to top"] {
            bottom: 80px !important;
          }
        }

        @media (max-width: 480px) {
          [aria-label="Chat with Unique Healthcare on WhatsApp"],
          [aria-label="Back to top"] {
            width: 44px !important;
            height: 44px !important;
            font-size: 18px !important;
            right: 16px !important;
          }

          [aria-label="Chat with Unique Healthcare on WhatsApp"] {
            bottom: 16px !important;
          }

          [aria-label="Back to top"] {
            bottom: 72px !important;
          }
        }
      `}</style>
    </>
  );
}
