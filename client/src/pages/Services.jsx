import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import { useMetaTags } from "../hooks/useMetaTags";
import { CONTACT } from "../constants/contact";

export default function Services() {
  const { language } = useLanguage();

  // Get base URL for absolute URLs
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return import.meta.env.VITE_FRONTEND_URL || 'https://unique-healthcare.vercel.app';
  };

  // Set meta tags
  useMetaTags({
    title: 'Our Services | Unique Healthcare PLC',
    description: 'Comprehensive healthcare solutions including equipment supply, delivery, installation, training, maintenance, and support across Ethiopia.',
    keywords: 'medical equipment services, healthcare installation, equipment training, maintenance support, Ethiopia',
    ogTitle: 'Healthcare Services | Unique Healthcare PLC',
    ogDescription: 'Professional medical equipment services - supply, delivery, installation, training, maintenance & support',
    ogImage: `${getBaseUrl()}/logo.png`,
    ogUrl: `${getBaseUrl()}/services`,
    ogType: 'website',
    ogSiteName: 'Unique Healthcare PLC',
    twitterCard: 'summary',
    twitterTitle: 'Healthcare Services | Unique Healthcare PLC',
    twitterDescription: 'Complete healthcare equipment and support services',
    twitterImage: `${getBaseUrl()}/logo.png`,
    canonical: `${getBaseUrl()}/services`,
  });

  const services = [
    { 
      icon: "🔬", 
      titleKey: "services.equipmentSupply", 
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200", 
      descKey: "services.equipmentDesc", 
      features: ["400+ products in catalog", "Genuine certified equipment", "Multiple global brands", "All healthcare categories"] 
    },
    { 
      icon: "🚚", 
      titleKey: "services.delivery", 
      bgColor: "bg-green-50", 
      borderColor: "border-green-200", 
      descKey: "services.deliveryDesc", 
      features: ["Delivery across Ethiopia", "Safe specialized packaging", "Real-time order tracking", "Express delivery available"] 
    },
    { 
      icon: "🛠️", 
      titleKey: "services.installation", 
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200", 
      descKey: "services.installationDesc", 
      features: ["On-site installation", "Equipment calibration", "System integration", "Commissioning support"] 
    },
    { 
      icon: "📚", 
      titleKey: "services.training", 
      bgColor: "bg-yellow-50", 
      borderColor: "border-yellow-200", 
      descKey: "services.trainingDesc", 
      features: ["Hands-on staff training", "Biomedical engineer training", "English & Amharic sessions", "Certificate of completion"] 
    },
    { 
      icon: "🔧", 
      titleKey: "services.maintenance", 
      bgColor: "bg-red-50", 
      borderColor: "border-red-200", 
      descKey: "services.maintenanceDesc", 
      features: ["Preventive maintenance plans", "Emergency repair service", "Genuine spare parts", "Annual service contracts"] 
    },
    { 
      icon: "💼", 
      titleKey: "services.bulk", 
      bgColor: "bg-cyan-50", 
      borderColor: "border-cyan-200", 
      descKey: "services.bulkDesc", 
      features: ["Government tenders", "NGO procurement support", "Volume discounts", "Full documentation"] 
    },
    { 
      icon: "📋", 
      titleKey: "services.consultation", 
      bgColor: "bg-emerald-50", 
      borderColor: "border-emerald-200", 
      descKey: "services.consultationDesc", 
      features: ["Needs assessment", "Equipment recommendations", "Budget planning", "Facility-specific advice"] 
    },
    { 
      icon: "🛡️", 
      titleKey: "services.warranty", 
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200", 
      descKey: "services.warrantyDesc", 
      features: ["Manufacturer warranty", "Local warranty claims", "Spare parts availability", "Dedicated support team"] 
    },
  ];

  const process = [
    { step: "01", title: "Needs Analysis", desc: "Facility audit & technical requirements assessment." },
    { step: "02", title: "Solution Design", desc: "Custom equipment package & proforma specification." },
    { step: "03", title: "Commissioning", desc: "Turnkey installation & clinical staff training." },
    { step: "04", title: "Ongoing Support", desc: "Scheduled PPMC & 24/7 emergency technical response." },
  ];

  const highlights = [
    { icon: "🏅", title: "Certified Equipment", desc: "Every product meets WHO and international medical standards." },
    { icon: "⚡", title: "Fast Turnaround", desc: "Quick procurement and delivery — time is critical in healthcare." },
    { icon: "🤝", title: "Local Expertise", desc: "10+ years serving Ethiopian facilities. We know your needs." },
    { icon: "📞", title: "Always Available", desc: "Dedicated support team for any technical or service need." },
  ];

  return (
    <div className="bg-white min-h-screen">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scroll-indicator {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-12 md:py-16 lg:py-20 flex items-center justify-center"
        style={{
          background: "#1d4ed8",
          backgroundImage: 'url(/images/hero1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: "35vh",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-white font-bold text-xs md:text-sm tracking-widest uppercase opacity-90 mb-4">
            {t(language, "services.heroTag")}
          </p>
          <h1 
            className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            {t(language, "services.heroTitle")}
          </h1>
          <p 
            className="text-white text-sm md:text-base lg:text-lg max-w-2xl mx-auto opacity-95"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          >
            {t(language, "services.heroDesc")}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-5 left-1/2 -translate-x-1/2"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <div className="w-7 h-11 border-2 border-white border-opacity-50 rounded-full relative">
            <div 
              className="w-1 h-2 bg-white bg-opacity-80 rounded absolute top-1.5 left-1/2 -translate-x-1/2"
              style={{ animation: "scroll-indicator 1.5s infinite" }}
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold text-xs md:text-sm tracking-widest uppercase block mb-2">
              {t(language, "services.whatWeOffer")}
            </span>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
              {t(language, "services.ourServices")}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              {t(language, "services.servicesDesc")}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div 
                key={service.titleKey} 
                className={`${service.bgColor} border-2 ${service.borderColor} rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow`}
              >
                <div className="flex gap-4 md:gap-6 items-start">
                  {/* Icon Box */}
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-sm">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-bold text-base md:text-lg mb-2">
                      {t(language, service.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                      {t(language, service.descKey)}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                          <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold text-xs md:text-sm tracking-widest uppercase block mb-2">
              {t(language, "services.simpleProcess")}
            </span>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
              {t(language, "services.howItWorks")}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              {t(language, "services.howDesc")}
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {process.map((step, index) => (
              <div key={step.step} className="text-center">
                {/* Step Number */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl mx-auto mb-4">
                  {step.step}
                </div>

                {/* Step Title */}
                <h3 className="text-gray-900 font-bold text-sm md:text-base mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {step.desc}
                </p>

                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-1/2 w-8 h-0.5 bg-blue-200 -translate-x-1/2 transform" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold text-xs md:text-sm tracking-widest uppercase block mb-2">
              {t(language, "services.whatWeOffer")}
            </span>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">
              The Difference We Make
            </h2>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight) => (
              <div 
                key={highlight.title}
                className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-3xl md:text-4xl mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base md:text-lg mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            {t(language, "services.letsTalk")}
          </h2>
          <p className="text-blue-100 text-sm md:text-base mb-8">
            {t(language, "services.freeConsultation")}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-colors"
            >
              {t(language, "services.contactUs")}
            </Link>
            <a 
              href={`tel:${CONTACT.phones[0].tel}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>📞</span>
              {CONTACT.phones[0].display}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
