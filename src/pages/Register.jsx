import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }
    register({ name, email, password, role });
    navigate("/login");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 rounded shadow-lg bg-zinc-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text"
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="email"
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 rounded bg-zinc-800 pr-10"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span
            className="absolute right-2 top-2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full p-2 rounded bg-zinc-800 pr-10"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-2 top-2 text-gray-400 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <select 
          className="w-full p-2 rounded bg-zinc-800"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <button className="w-full p-2 rounded bg-blue-600 hover:bg-blue-500">Register</button>
      </form>
    </div>
  );
}
