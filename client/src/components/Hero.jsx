import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-blue-50 py-24">

      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          Healthcare Equipment You Can Trust
        </h1>

        <p className="text-gray-600 text-xl mb-8">
          Supplying hospitals, clinics, and healthcare professionals with high-quality medical equipment.
        </p>

        <Link
          to="/products"
          className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800"
        >
          Browse Products
        </Link>

      </div>

    </section>
  );
}

export default Hero;