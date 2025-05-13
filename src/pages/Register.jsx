import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Tüm alanlar zorunludur!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/workintech/twitter/auth/register",
        {
          email,
          password,
          username,
        }
      );

      if (response.status === 200) {
        // Kayıt başarılı olduktan sonra login sayfasına yönlendir
        navigate("/login");
      }
    } catch (err) {
      setError("Bir hata oluştu! Lütfen tekrar deneyin.");
      console.error("Register error", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Kayıt Ol</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Kullanıcı Adı
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Kullanıcı adınızı girin"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-posta
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="E-posta adresinizi girin"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Şifre
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Şifrenizi girin"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Kayıt Ol
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-4 w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
        >
          Zaten üye misiniz? Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Register;
