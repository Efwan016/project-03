import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyProducts from "./MyProducts";

function SellerProfile() {
    const [activeTab, setActiveTab] = useState("info");
    const sellerId = 1;

    const [seller, setSeller] = useState({
        id: sellerId,
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: `https://api.dicebear.com/6.x/adventurer/svg?seed=guest`,
        description: "Menjual berbagai produk berkualitas dengan harga terjangkau.",
    });

    const [isEditing, setIsEditing] = useState(false);

    // Statistik seller
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });

    const defaultAvatars = ["guest", "cat", "dog", "fox", "bear", "lion"];

    // Load seller profile
    useEffect(() => {
        const storedSeller = JSON.parse(localStorage.getItem("sellerProfile"));
        if (storedSeller) setSeller(storedSeller);
    }, []);

    // Save seller profile
    useEffect(() => {
        localStorage.setItem("sellerProfile", JSON.stringify(seller));
    }, [seller]);

    // Hitung statistik
    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("products") || "[]");
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");

        const sellerProducts = products.filter((p) => p.sellerId === sellerId);
        const sellerOrders = orders.filter((o) => o.sellerId === sellerId);

        const totalRevenue = sellerOrders.reduce((sum, o) => sum + (o.total || 0), 0);

        setStats({
            totalProducts: sellerProducts.length,
            totalOrders: sellerOrders.length,
            totalRevenue,
        });
    }, [sellerId]);

    // Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeller((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setSeller((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleDefaultAvatar = (avatar) => {
        setSeller((prev) => ({
            ...prev,
            avatar: `https://api.dicebear.com/6.x/adventurer/svg?seed=${avatar}`,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">
                <Link to="/seller" className="hover:underline">
                    Hi, {seller.name || "Seller"}
                </Link>
            </h1>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-zinc-700 mb-6">
                <button
                    onClick={() => setActiveTab("info")}
                    className={`px-4 py-2 ${
                        activeTab === "info"
                            ? "border-b-2 border-indigo-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Info Toko
                </button>
                <button
                    onClick={() => setActiveTab("products")}
                    className={`px-4 py-2 ${
                        activeTab === "products"
                            ? "border-b-2 border-indigo-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Produk Saya
                </button>
                <button
                    onClick={() => setActiveTab("stats")}
                    className={`px-4 py-2 ${
                        activeTab === "stats"
                            ? "border-b-2 border-indigo-500 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Statistik
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "info" && (
                <div className="space-y-6">
                    {!isEditing ? (
                        <div className="flex items-start space-x-6">
                            <img
                                src={seller.avatar}
                                alt={seller.name}
                                className="w-24 h-24 object-cover rounded-full border"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{seller.name || "Nama Toko"}</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-2">
                                    {seller.description}
                                </p>
                                <p className="text-sm">📧 {seller.email || "-"}</p>
                                <p className="text-sm">📱 {seller.phone || "-"}</p>
                                <p className="text-sm">📍 {seller.address || "-"}</p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-4 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
                                >
                                    Edit Toko
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 max-w-md">
                            {/* Upload avatar */}
                            <div>
                                <label className="block text-sm mb-1">Upload Avatar</label>
                                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                                {seller.avatar && (
                                    <img
                                        src={seller.avatar}
                                        alt="preview"
                                        className="w-20 h-20 rounded-full mt-2 object-cover border"
                                    />
                                )}
                            </div>

                            {/* Pilih avatar bawaan */}
                            <div>
                                <label className="block text-sm mb-2">Atau pilih avatar bawaan:</label>
                                <div className="flex space-x-3">
                                    {defaultAvatars.map((avatar) => (
                                        <img
                                            key={avatar}
                                            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${avatar}`}
                                            alt="avatar"
                                            onClick={() => handleDefaultAvatar(avatar)}
                                            className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                                                seller.avatar.includes(avatar)
                                                    ? "border-indigo-600"
                                                    : "border-transparent"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Nama toko */}
                            <div>
                                <label className="block text-sm mb-1">Nama Toko</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={seller.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={seller.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm mb-1">Nomor Telepon</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={seller.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm mb-1">Alamat</label>
                                <textarea
                                    name="address"
                                    value={seller.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Deskripsi toko */}
                            <div>
                                <label className="block text-sm mb-1">Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={seller.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Tombol simpan */}
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
                            >
                                Simpan
                            </button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "products" && <MyProducts />}

            {activeTab === "stats" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow">
                        <h3 className="text-sm text-gray-500">Total Produk</h3>
                        <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow">
                        <h3 className="text-sm text-gray-500">Total Order</h3>
                        <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow">
                        <h3 className="text-sm text-gray-500">Total Revenue</h3>
                        <p className="text-2xl font-bold">
                            Rp {stats.totalRevenue.toLocaleString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellerProfile;
