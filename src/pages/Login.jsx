import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // AuthContext'ten useAuth hook'unu alıyoruz

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Sadece context'teki login fonksiyonunu çağırıyoruz
      navigate("/"); // Giriş başarılıysa yönlendir
    } catch (error) {
      console.error("Giriş yapılırken bir hata oluştu:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-1/3"
      >
        <h2 className="text-2xl mb-4">Giriş Yap</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Giriş Yap
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-4 w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
        >
          Üye değil misiniz? Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Login;
