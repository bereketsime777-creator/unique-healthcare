const testimonials = [
  {
    id: 1,
    name: "Dr. Abebe Bekele",
    position: "Chief Medical Officer",
    hospital: "Black Lion Hospital, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Abebe+Bekele&background=2563eb&color=fff&size=128",
    rating: 5,
    text: "Unique Healthcare has been our trusted partner for over 5 years. Their medical equipment is top-quality, and their after-sales support is exceptional. The delivery is always on time, and the technical team is very knowledgeable.",
  },
  {
    id: 2,
    name: "Sr. Tigist Hailu",
    position: "Head Nurse",
    hospital: "St. Paul's Hospital, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Tigist+Hailu&background=10b981&color=fff&size=128",
    rating: 5,
    text: "We recently purchased patient monitors and surgical instruments from Unique Healthcare. The quality exceeded our expectations, and the prices were very competitive. Their customer service team was helpful throughout the entire process.",
  },
  {
    id: 3,
    name: "Dr. Solomon Tesfaye",
    position: "Laboratory Director",
    hospital: "Tikur Anbessa Hospital, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Solomon+Tesfaye&background=8b5cf6&color=fff&size=128",
    rating: 5,
    text: "The laboratory equipment we purchased from Unique Healthcare has significantly improved our diagnostic capabilities. Their technical support is outstanding, and they provided comprehensive training for our staff.",
  },
  {
    id: 4,
    name: "Dr. Meron Tadesse",
    position: "Hospital Administrator",
    hospital: "Yekatit 12 Hospital, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Meron+Tadesse&background=ec4899&color=fff&size=128",
    rating: 5,
    text: "Unique Healthcare has consistently provided us with reliable medical equipment and excellent service. Their product range is extensive, and they always have what we need. Highly recommended!",
  },
  {
    id: 5,
    name: "Dr. Yohannes Alemu",
    position: "Chief Surgeon",
    hospital: "Zewditu Memorial Hospital, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Yohannes+Alemu&background=f59e0b&color=fff&size=128",
    rating: 5,
    text: "We equipped our entire surgical unit with instruments from Unique Healthcare. The quality is excellent, and the pricing is very fair. Their delivery was prompt, and installation was smooth.",
  },
  {
    id: 6,
    name: "Dr. Birtukan Negash",
    position: "Radiology Head",
    hospital: "Gandhi Memorial Hospital, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Birtukan+Negash&background=06b6d4&color=fff&size=128",
    rating: 5,
    text: "The imaging equipment from Unique Healthcare has transformed our radiology department. The image quality is superb, and the technical support team is always available when we need them.",
  },
];

function Testimonials({ limit = null, title = "What Healthcare Professionals Say About Us" }) {
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section style={{ padding: "80px 20px", background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0f172a", marginBottom: "12px" }}>
            {title}
          </h2>
          <p style={{ fontSize: "18px", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
            Trusted by leading hospitals and healthcare facilities across Ethiopia
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
        }}>
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Quote Icon */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "48px",
                color: "#e0f2fe",
                fontFamily: "Georgia, serif",
                lineHeight: 1,
              }}>
                "
              </div>

              {/* Rating */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} style={{ width: "20px", height: "20px", fill: "#fbbf24" }} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p style={{
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#475569",
                marginBottom: "24px",
                fontStyle: "italic",
              }}>
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "3px solid #e0f2fe",
                  }}
                />
                <div>
                  <p style={{ fontWeight: "700", fontSize: "16px", color: "#0f172a", margin: "0 0 4px" }}>
                    {testimonial.name}
                  </p>
                  <p style={{ fontSize: "14px", color: "#2563eb", fontWeight: "600", margin: "0 0 2px" }}>
                    {testimonial.position}
                  </p>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                    {testimonial.hospital}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {!limit && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <p style={{ fontSize: "16px", color: "#475569", marginBottom: "20px" }}>
              Join hundreds of satisfied healthcare facilities across Ethiopia
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(37,99,235,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,99,235,0.4)";
              }}
            >
              Get Started Today →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
