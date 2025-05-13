import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// useAuth hook'u ekliyoruz
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Safe JSON parse function
  const safeJSONParse = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  };

  // useEffect ile sayfa her yüklendiğinde token ve user kontrolü yapıyoruz
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = safeJSONParse(storedUser);
    if (parsedUser) {
      setUser(parsedUser); // User bilgilerini state'e yüklüyoruz
    } else {
      localStorage.removeItem("user"); // Geçersiz veriyi temizle
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/workintech/twitter/auth/login",
        { email, password }
      );
      const userData = response.data.user; // User bilgilerini alıyoruz

      // User bilgisini localStorage'a kaydediyoruz
      localStorage.setItem("user", JSON.stringify(userData));

      // User bilgilerini state'e kaydediyoruz
      setUser(userData);
    } catch (error) {
      console.error("Login hatası:", error);
      throw error; // Hata durumunda mesaj verebiliriz
    }
  };

  const logout = () => {
    // localStorage'dan user bilgisini kaldırıyoruz
    localStorage.removeItem("user");
    setUser(null); // Kullanıcı bilgisini state'ten temizliyoruz
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
