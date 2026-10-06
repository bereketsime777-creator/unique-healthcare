import { useState } from "react";
import API from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import { useMetaTags } from "../hooks/useMetaTags";
import { CONTACT } from "../constants/contact";

export default function AfterSalesService() {
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
    title: 'After-Sales Service | Unique Healthcare PLC',
    description: 'Submit service requests for maintenance, repair, installation, and training support. Fast response within 24 hours.',
    keywords: 'after-sales service, maintenance, repair, installation, technical support, Ethiopia',
    ogTitle: 'After-Sales Service | Unique Healthcare PLC',
    ogDescription: 'Professional after-sales service and support for medical equipment',
    ogImage: `${getBaseUrl()}/logo.png`,
    ogUrl: `${getBaseUrl()}/after-sales-service`,
    ogType: 'website',
    ogSiteName: 'Unique Healthcare PLC',
    twitterCard: 'summary',
    twitterTitle: 'After-Sales Service | Unique Healthcare PLC',
    twitterDescription: 'Submit maintenance and repair requests for medical equipment',
    twitterImage: `${getBaseUrl()}/logo.png`,
    canonical: `${getBaseUrl()}/after-sales-service`,
  });

  const serviceInfo = [
    { 
      icon: "🔧", 
      title: language === 'am' ? "ድህረ ሽያጭ ድጋፍ" : "After-Sales Support", 
      desc: language === 'am' ? "ለሁሉም መሳሪያዎች ሙሉ ድህረ ሽያጭ አገልግሎት ይሰጣል።" : "We provide complete after-sales service for all equipment." 
    },
    { 
      icon: "⚡", 
      title: language === 'am' ? "ፍጥን ምላሽ" : "Fast Response", 
      desc: language === 'am' ? "ጥያቄ ቀርቦ ከ 24 ሰዓት ውስጥ ምላሽ ተሰጥቷል።" : "Request submitted, response within 24 hours." 
    },
    { 
      icon: "💼", 
      title: language === 'am' ? "ባለሙያ አገልግሎት" : "Professional Service", 
      desc: language === 'am' ? "የተጠናቀቁ ቴክኒሻኖቻችን ሁሉንም የአገልግሎት ጥያቄዎች ያስተናግዳሉ።" : "Our certified technicians handle all service requests." 
    },
    { 
      icon: "📞", 
      title: language === 'am' ? "ቀላል ግንኙነት" : "Easy Communication", 
      desc: language === 'am' ? "ማንኛውም ጊዜ የእርስዎን የአገልግሎት ጥያቄ ሁኔታ ይከታተሉ።" : "Track your service request status anytime." 
    },
  ];

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
      setError(language === 'am' ? "እባክዎ የመሳሪያ ስም ያስገቡ" : "Please enter equipment name");
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

    if (
      !form.contactPerson ||
      !form.serviceType ||
      !selectedEquipment.equipment ||
      !form.serviceDescription ||
      !form.serviceLocation
    ) {
      setError(
        language === 'am' 
          ? "እባክዎ ሁሉንም የሚያስፈልጋቸው ሜዳዎች ይሙሉ"
          : "Please fill in all required fields: contact person, service type, equipment, description, and location."
      );
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

  const resetForm = () => {
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
  };

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
        input, textarea, select {
          font-family: inherit;
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 md:py-16 lg:py-20 flex items-center justify-center"
        style={{
          background: "#0369a1",
          backgroundImage: "url(/images/hero1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "35vh",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-white font-bold text-xs md:text-sm tracking-widest uppercase opacity-90 mb-4">
            {language === 'am' ? "ድህረ ሽያጭ ድጋፍ" : "After-Sales Support"}
          </p>
          <h1
            className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            {language === 'am' ? "አገልግሎት ጥያቄ" : "Service Request"}
          </h1>
          <p
            className="text-white text-sm md:text-base lg:text-lg max-w-2xl mx-auto opacity-95"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          >
            {language === 'am'
              ? "ጠገና፣ ጥገና ወይም ግንባታ ድጋፍ ያስፈልገዎታል? የእርስዎን የአገልግሎት ጥያቄ ያስቀምጡ እና 球ራ 24 ሰዓት ውስጥ ድንገተኛ ምላሽ እንሰጠዋለን።"
              : "Need maintenance, repair, or installation support? Submit your service request and our team will respond within 24 hours."}
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

      {/* Main Content */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="lg:col-span-1">
              <h2 className="text-gray-900 font-bold text-xl md:text-2xl mb-6">
                {language === 'am' ? "ለምን አገልግሎት ጥያቄ ያስቀምጡ?" : "Why Submit a Service Request?"}
              </h2>
              <div className="space-y-4">
                {serviceInfo.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border-2 border-cyan-200 rounded-xl p-4 md:p-5 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-3 md:gap-4 items-start">
                      <div className="flex-shrink-0 w-11 h-11 bg-cyan-100 rounded-lg flex items-center justify-center text-lg md:text-xl">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-bold text-sm md:text-base mb-1">
                          {item.title}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Request Form */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-gray-900 font-bold text-xl md:text-2xl mb-2">
                {language === 'am' ? "አገልግሎት ጥያቄ ያስቀምጡ" : "Submit Service Request"}
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-8">
                {language === 'am'
                  ? "ፎርሙን ይሙሉ እና 球ራ 24 ሰዓት ውስጥ ወደ እርስዎ ይመለሳል።"
                  : "Fill out the form and our team will get back to you within 24 hours."}
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl md:text-6xl mb-4">✅</div>
                  <h3 className="text-gray-900 font-bold text-lg md:text-2xl mb-3">
                    {language === 'am' ? "አገልግሎት ጥያቄ ተጠየቀ!" : "Service Request Submitted!"}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-2">
                    {language === 'am'
                      ? "ለአገልግሎት ጥያቄዎ ምስጋና በልግ።"
                      : "Thank you for submitting your service request."}
                  </p>
                  {submittedData?.serviceRequestNumber && (
                    <p className="text-cyan-700 text-base md:text-lg font-bold mb-6 bg-cyan-50 p-3 md:p-4 rounded-lg">
                      {language === 'am' ? "የእርስዎ SR#:" : "Your SR#:"} <strong>{submittedData.serviceRequestNumber}</strong>
                    </p>
                  )}
                  <p className="text-gray-600 text-sm md:text-base mb-8">
                    {language === 'am'
                      ? "ኩርሳ 24 ሰዓት ውስጥ ደዋለን። ወደ ወደብ ለማጣቀስ የእርስዎን SR# ያስቀምጡ።"
                      : "We will contact you within 24 hours. Keep your SR# for reference."}
                  </p>
                  <button
                    onClick={resetForm}
                    className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 md:px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    {language === 'am' ? "ሌላ ጥያቄ ያስቀምጡ" : "Submit Another Request"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 md:p-4 text-sm md:text-base">
                      ⚠ {error}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ሙሉ ስም *" : "Full Name *"}
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder={language === 'am' ? "የእርስዎ ስም" : "Your name"}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ኢሜይል አድራሻ *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@hospital.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                  </div>

                  {/* Phone & Contact Person */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ስልክ ቁጥር *" : "Phone Number *"}
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+251 9XX XXX XXX"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ተገናኝ ሰው ስም *" : "Contact Person *"}
                      </label>
                      <input
                        name="contactPerson"
                        value={form.contactPerson}
                        onChange={handleChange}
                        required
                        placeholder={language === 'am' ? "ለምሳሌ ዶክተር አበበ" : "e.g., Dr. Abebe"}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                      {language === 'am' ? "ተቋም / ሆስፒታል / ክሊኒክ *" : "Organization / Hospital / Clinic *"}
                    </label>
                    <input
                      name="organizationName"
                      value={form.organizationName}
                      onChange={handleChange}
                      required
                      placeholder={language === 'am' ? "ለምሳሌ አዲስ አበባ ጠቅላላ ሆስፒታል" : "e.g., Addis Ababa General Hospital"}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>

                  {/* Service Type & Serial Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "አገልግሎት ዓይነት *" : "Service Type *"}
                      </label>
                      <select
                        name="serviceType"
                        value={form.serviceType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      >
                        <option value="">{language === 'am' ? "አገልግሎት ዓይነት ይምረጡ" : "Select service type"}</option>
                        <option value="installation">{language === 'am' ? "ግንባታ" : "Installation"}</option>
                        <option value="maintenance">{language === 'am' ? "ጠገና" : "Maintenance"}</option>
                        <option value="repair">{language === 'am' ? "ጥገና" : "Repair"}</option>
                        <option value="troubleshooting">{language === 'am' ? "ስህተት ፈለግ" : "Troubleshooting"}</option>
                        <option value="training">{language === 'am' ? "ስልጠና" : "Training"}</option>
                        <option value="other">{language === 'am' ? "ሌላ" : "Other"}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ተከታታይ ቁጥር" : "Serial Number"}
                      </label>
                      <input
                        name="serialNumber"
                        value={form.serialNumber}
                        onChange={handleChange}
                        placeholder={language === 'am' ? "ለምሳሌ SN-2024-1234" : "e.g., SN-2024-1234"}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                  </div>

                  {/* Equipment Selection */}
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                      {language === 'am' ? "መሳሪያ / ምርት *" : "Equipment / Product *"}
                    </label>
                    {selectedEquipment.equipment ? (
                      <div className="bg-white border border-gray-300 rounded-lg p-3 md:p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm md:text-base font-bold text-gray-900 mb-1">
                            {selectedEquipment.equipment}
                          </p>
                          {!selectedEquipment.equipmentProductId && (
                            <p className="text-xs text-gray-500 italic">
                              {language === 'am' ? "(በእጅ ተጀምሮ)" : "(manually entered)"}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEquipment({ equipmentProductId: null, equipment: "" });
                            setProductSearch("");
                            setShowEquipmentSearch(false);
                          }}
                          className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-bold hover:bg-red-100 transition-colors"
                        >
                          {language === 'am' ? "ተጀምሮ" : "Change"}
                        </button>
                      </div>
                    ) : !showEquipmentSearch ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowEquipmentSearch(true);
                          setProductSearch("");
                        }}
                        className="w-full bg-white border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 rounded-lg py-2.5 font-bold text-sm md:text-base transition-colors"
                      >
                        + {language === 'am' ? "መሳሪያ ይምረጡ" : "Select Equipment"}
                      </button>
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={language === 'am' ? "መሳሪያ ፈልግ ወይም ምርት ስም ይተይቡ..." : "Search equipment or type product name..."}
                          value={productSearch}
                          onChange={(e) => handleEquipmentSearch(e.target.value)}
                          autoFocus
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                        />
                        {products.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
                            {products.map((p) => (
                              <button
                                key={p._id}
                                type="button"
                                onClick={() => selectEquipment(p)}
                                className="w-full text-left px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                              >
                                <div className="font-bold text-gray-900 text-sm">{p.name}</div>
                                <div className="text-xs text-gray-500">{p.category}</div>
                              </button>
                            ))}
                          </div>
                        )}
                        {productSearch && products.length === 0 && !searchingProducts && (
                          <div className="mt-2 p-3 md:p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                            <p className="text-xs md:text-sm text-cyan-700 mb-2">
                              {language === 'am'
                                ? `ምንም ተዛማጅ መሳሪያ ዋ። "${productSearch}" በእጅ ይጨምሩ:`
                                : `No matching equipment. Add "${productSearch}" manually:`}
                            </p>
                            <button
                              type="button"
                              onClick={() => enterManualEquipment(productSearch)}
                              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded font-bold text-xs md:text-sm transition-colors"
                            >
                              {language === 'am' ? "ይጨምሩ" : "Add"} "{productSearch}"
                            </button>
                          </div>
                        )}
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (productSearch.trim()) {
                                enterManualEquipment(productSearch);
                              } else {
                                setShowEquipmentSearch(false);
                              }
                            }}
                            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded font-bold text-xs md:text-sm transition-colors"
                          >
                            {productSearch.trim() 
                              ? (language === 'am' ? "እንደ ቅጽ መሳሪያ ይጨምሩ" : "Add as Manual Equipment")
                              : (language === 'am' ? "ተጠናቀቀ" : "Done")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowEquipmentSearch(false)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded font-bold text-xs md:text-sm transition-colors"
                          >
                            {language === 'am' ? "ሰርዝ" : "Cancel"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ግዢ ቀን" : "Purchase Date"}
                      </label>
                      <input
                        type="date"
                        name="purchaseDate"
                        value={form.purchaseDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                        {language === 'am' ? "ምርጥ አገልግሎት ቀን" : "Preferred Service Date"}
                      </label>
                      <input
                        type="date"
                        name="preferredServiceDate"
                        value={form.preferredServiceDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>
                  </div>

                  {/* Service Location */}
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                      {language === 'am' ? "አገልግሎት ቦታ *" : "Service Location *"}
                    </label>
                    <input
                      name="serviceLocation"
                      value={form.serviceLocation}
                      onChange={handleChange}
                      required
                      placeholder={language === 'am' ? "ለምሳሌ ቦሌ ወረዳ፣ አዲስ አበባ" : "e.g., Bole Sub-City, Addis Ababa"}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>

                  {/* Service Description */}
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                      {language === 'am' ? "አገልግሎት መግለጫ / ጉዳይ *" : "Service Description / Issue *"}
                    </label>
                    <textarea
                      name="serviceDescription"
                      value={form.serviceDescription}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={
                        language === 'am'
                          ? "ጉዳይውን፣ ጠገናን ወይም የሚያስፈልገውን አገልግሎትን ይግለጹ..."
                          : "Describe the issue, maintenance needed, or service required..."
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-base md:text-lg transition-opacity ${
                      loading
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-70"
                        : "bg-cyan-600 hover:bg-cyan-700 text-white"
                    }`}
                  >
                    {loading 
                      ? `↻ ${language === 'am' ? "ይላክ..." : "Submitting..."}`
                      : `${language === 'am' ? "አገልግሎት ጥያቄ ያስቀምጡ" : "Submit Service Request"} →`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white border-t border-gray-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "⚡", label: language === 'am' ? "ፍጥን ምላሽ" : "Fast Response", sublabel: language === 'am' ? "24 ሰዓት ውስጥ" : "Within 24 hours" },
              { icon: "🔧", label: language === 'am' ? "ባለሙያ ማኅበር" : "Professional Team", sublabel: language === 'am' ? "ተጠናቀቁ ቴክኒሻኖች" : "Certified technicians" },
              { icon: "📋", label: language === 'am' ? "ምክንያት ይከታተሉ" : "Track Request", sublabel: language === 'am' ? "SR# ወደ ከ" : "Use your SR# anytime" },
              { icon: "📞", label: language === 'am' ? "ድጋፍ ያግኙ" : "Get Support", sublabel: language === 'am' ? "ማንኛውም ጊዜ፣ ሁሉበቤት" : "Anytime, anywhere" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>
                <p className="text-gray-900 font-bold text-sm md:text-base mb-1">{item.label}</p>
                <p className="text-gray-600 text-xs md:text-sm">{item.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
