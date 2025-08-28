import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <section className="text-center py-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Kami selalu siap mendengar Anda. Hubungi tim Customer Service kami untuk solusi cepat dan aman.
        </p>
      </section>

      {/* Info Kontak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {/* Alamat */}
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-5 text-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl text-blue-600 mx-auto mb-3" />
          <h5 className="font-semibold text-gray-800 dark:text-white">Alamat</h5>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Griya Dros, Jl KH Abdullah Syafe'i No 1, Jakarta
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-5 text-center">
          <FontAwesomeIcon icon={faPhone} className="text-3xl text-green-600 mx-auto mb-3" />
          <h5 className="font-semibold text-gray-800 dark:text-white">Phone</h5>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            <a href="tel:+62123456789" className="underline text-blue-500">
              +62 123 4567 89
            </a>
          </p>
        </div>

        {/* Email */}
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-5 text-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-red-600 mx-auto mb-3" />
          <h5 className="font-semibold text-gray-800 dark:text-white">Email</h5>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            <a href="mailto:efwanrizaldi@gmail.com" className="underline text-blue-500">
              efwanrizaldi@gmail.com
            </a>
          </p>
        </div>

        {/* Website */}
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-5 text-center">
          <FontAwesomeIcon icon={faGlobe} className="text-3xl text-purple-600 mx-auto mb-3" />
          <h5 className="font-semibold text-gray-800 dark:text-white">Website</h5>
          <button
            onClick={() => alert("Fitur diklik!")}
            className="mt-1 text-blue-500 underline"
          >
            Kunjungi
          </button>
        </div>
      </div>

      {/* Form & Map */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Hubungi Kami</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama"
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Pesan..."
              rows="4"
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => alert("Pesan terkirim!")}
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="w-full h-96 rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
