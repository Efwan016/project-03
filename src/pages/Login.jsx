import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../store/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) {
      setError("Email atau password salah");
      return;
    }
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="w-full p-2 rounded bg-blue-600 hover:bg-blue-500">
          Masuk
        </button>
      </form>

      {/* Tambahan navigasi */}
      <div className="mt-4 text-sm text-center text-gray-300 space-y-1">
        <p>
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Daftar
          </Link>
        </p>
        <p>
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Lupa password?
          </Link>
        </p>
      </div>
    </div>
  );
}
