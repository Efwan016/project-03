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
      <div className="max-w-sm mx-auto mt-10 p-6 rounded shadow-lg  text-white">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
            type="email"
            className="w-full p-2 rounded text-gray-700"
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
  );
}
