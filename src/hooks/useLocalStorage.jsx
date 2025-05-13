import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // AuthContext'e erişim için

const handleLogin = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    const token = response.data.token;
    const user = response.data.user; // Backend'den gelen kullanıcı bilgilerini alıyoruz

    // Token'ı localStorage'a kaydediyoruz
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Kullanıcı bilgisini de kaydediyoruz

    // AuthContext'e kullanıcıyı kaydediyoruz
    setUser(user); // `setUser` fonksiyonu AuthContext'ten gelmeli

    // Kullanıcıyı ana sayfaya yönlendiriyoruz
    history.push("/home");
  } catch (error) {
    console.error("Giriş yapılırken hata oluştu:", error);
  }
};
