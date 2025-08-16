import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Email wajib diisi");
      return;
    }
    setMessage(`Link reset password sudah dikirim ke ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="max-w-sm w-full p-6 rounded shadow-lg bg-zinc-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
            type="email"
            className="w-full p-2 rounded bg-zinc-800"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {message && <div className="text-green-400 text-sm">{message}</div>}
          <button className="w-full p-2 rounded bg-blue-600 hover:bg-blue-500">
            Kirim Link Reset
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-3">
          Ingat password? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
