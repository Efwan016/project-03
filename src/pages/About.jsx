import React from "react";

const teamMembers = [
  {
    name: "Efwan",
    role: "Frontend Developer",
    photo: "https://api.dicebear.com/6.x/adventurer/svg?seed=efwan",
  },
  {
    name: "Rina",
    role: "Backend Developer",
    photo: "https://api.dicebear.com/6.x/adventurer/svg?seed=rina",
  },
  {
    name: "Budi",
    role: "UI/UX Designer",
    photo: "https://api.dicebear.com/6.x/adventurer/svg?seed=budi",
  },
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tentang Kami
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Aplikasi ini dibuat untuk memberikan pengalaman belanja online
          yang lebih mudah, cepat, dan nyaman.
        </p>
      </div>

      {/* Visi & Misi */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Visi & Misi
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Visi kami adalah menghadirkan platform belanja modern yang ramah
          pengguna dan efisien. Dengan misi mendukung UMKM lokal, menyediakan
          layanan terbaik, serta menjaga keamanan transaksi.
        </p>
      </div>

      {/* Tim Kami */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Tim Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300 dark:border-gray-600"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kontak */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Hubungi Kami
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ✉️ Email: support@Adzanimarket.com
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          📱 WhatsApp: +62 812-1811-5660
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Ikuti kami di{" "}
          <a
            href="https://instagram.com"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Instagram
          </a>{" "}
          dan{" "}
          <a
            href="https://facebook.com"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Facebook
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
