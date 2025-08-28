import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("riwayat");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=guest`,
  });

  const [formData, setFormData] = useState(profileData);
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  // Pilihan avatar
  const avatarSeeds = ["guest", "cat", "dog", "fox", "bear", "lion"];

  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/orders?status=${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setOrders((prev) => ({ ...prev, [status]: data }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    setProfileData({
      username: auth.username || "guest",
      email: auth.email || "",
      phone: auth.phone || "",
      address: auth.address || "",
      photo: auth.photo || `https://api.dicebear.com/6.x/adventurer/svg?seed=guest`,
    });
    setFormData({
      username: auth.username || "guest",
      email: auth.email || "",
      phone: auth.phone || "",
      address: auth.address || "",
      photo: auth.photo || `https://api.dicebear.com/6.x/adventurer/svg?seed=guest`,
    });
  }, []);

  useEffect(() => {
    if (!orders[activeTab]) {
      fetchOrders(activeTab);
    }
  }, [activeTab, orders]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedProfile = { ...profileData, ...formData };
    setProfileData(updatedProfile);
    localStorage.setItem("auth", JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Profil */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow rounded-lg p-6 gap-6">
        <div className="text-center md:w-1/3">
          <img
            src={profileData.photo}
            alt="Foto Profil"
            className="w-36 h-36 rounded-full mx-auto border-4 border-gray-200 dark:border-gray-700"
          />
          <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
            {profileData.username}
          </h3>
          <p className="text-gray-500">{profileData.email}</p>
        </div>

        <div className="md:w-2/3 space-y-3">
          {isEditing ? (
            <>
              {/* Avatar */}
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Foto Profil</h6>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const seed = Math.random().toString(36).substring(7);
                      setFormData({ ...formData, photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}` });
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded"
                  >
                    🎲 Random Avatar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {avatarSeeds.map((seed) => (
                    <img
                      key={seed}
                      src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`}
                      alt={seed}
                      onClick={() => setFormData({ ...formData, photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}` })}
                      className={`w-12 h-12 rounded-full cursor-pointer border-2 ${formData.photo.includes(seed) ? "border-blue-500" : "border-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Username */}
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Username</h6>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Email */}
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Email</h6>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Phone */}
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Nomor HP</h6>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Address */}
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Alamat</h6>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  💾 Simpan
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  ❌ Batal
                </button>
              </div>
            </>
          ) : (
            <>
              {/* View mode */}
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Nomor HP</h6>
                <p className="text-gray-900 dark:text-white">{profileData.phone || "-"}</p>
              </div>
              <div className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                <h6 className="text-gray-500">Alamat</h6>
                <p className="text-gray-900 dark:text-white">{profileData.address || "-"}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-3 px-4 py-2 bg-yellow-500 text-black rounded"
              >
                ✏️ Edit Profil
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tab Pesanan Saya */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Pesanan Saya
        </h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { key: "riwayat", label: "Riwayat" },
            { key: "belum_bayar", label: "Belum Bayar" },
            { key: "dikemas", label: "Dikemas" },
            { key: "dikirim", label: "Dikirim" },
            { key: "penilaian", label: "Penilaian" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Konten Tab */}
        <div className="mt-4 space-y-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="mb-3">
                <Skeleton height={50} borderRadius={8} />
              </div>
            ))
          ) : orders[activeTab]?.length > 0 ? (
            orders[activeTab].map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded bg-white dark:bg-gray-800 shadow"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {order.name}
                </h4>
                {activeTab === "riwayat" && (
                  <p className="text-sm text-gray-500">{order.status} • {order.date}</p>
                )}
                {activeTab === "belum_bayar" && (
                  <p className="text-sm text-red-500">Rp {order.price}</p>
                )}
                {activeTab === "dikemas" && (
                  <p className="text-sm text-gray-500">Ekspedisi: {order.ekspedisi}</p>
                )}
                {activeTab === "dikirim" && (
                  <p className="text-sm text-gray-500">Resi: {order.resi}</p>
                )}
                {activeTab === "penilaian" && (
                  <button className="mt-2 px-3 py-1 bg-yellow-400 text-black rounded">
                    ⭐ Beri Penilaian
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tidak ada data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
