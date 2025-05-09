import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { login } from "../store/actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/"); // Giriş başarılıysa anasayfaya yönlendir
    }
  }, [isAuthenticated, history]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // thunk action
  };

  // if (isAuthenticated) {
  //   history.push("/"); // Giriş başarılıysa anasayfaya yönlendir
  // }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="block text-gray-700 text-2xl font-bold mb-6 text-center">
          Giriş Yap
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-posta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Şifre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/register"
            >
              Kayıt Ol!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
