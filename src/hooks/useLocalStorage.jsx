import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const handleLogin = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    const user = response.data.user; // Backend'den gelen kullanıcı bilgilerini alıyoruz

    // User bilgisini localStorage'a kaydediyoruz
    localStorage.setItem("user", JSON.stringify(user)); // Kullanıcı bilgisini de kaydediyoruz

    // AuthContext'e kullanıcıyı kaydediyoruz
    setUser(user); // `setUser` fonksiyonu AuthContext'ten gelmeli

    // Kullanıcıyı ana sayfaya yönlendiriyoruz
    navigate("/home");
  } catch (error) {
    console.error("Giriş yapılırken hata oluştu:", error);
  }
};
