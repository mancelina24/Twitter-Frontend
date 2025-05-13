import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// useAuth hook'u ekliyoruz
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect ile sayfa her yüklendiğinde token ve user kontrolü yapıyoruz
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser)); // User bilgilerini state'e yüklüyoruz
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/workintech/twitter/auth/login",
        { email, password }
      );
      const token = response.data.token; // Token'ı alıyoruz
      const userData = response.data.user; // User bilgilerini alıyoruz

      // Token'ı ve user bilgisini localStorage'a kaydediyoruz
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // User bilgilerini state'e kaydediyoruz
      setUser(userData);
    } catch (error) {
      console.error("Login hatası:", error);
    }
  };

  const logout = () => {
    // localStorage'dan token ve user bilgilerini kaldırıyoruz
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null); // Kullanıcı bilgisini state'ten temizliyoruz
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
