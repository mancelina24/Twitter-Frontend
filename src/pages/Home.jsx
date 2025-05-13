import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const { user, logout } = useAuth();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Yönlendirme için state
  const isFirstRender = useRef(true); // İlk render'ı takip etmek için

  // Sayfa ilk yüklendiğinde tüm tweet'leri al
  useEffect(() => {
    const fetchTweets = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        // Token yoksa ve ilk render ise yönlendir
        if (isFirstRender.current) {
          history.push("/login");
          isFirstRender.current = false; // Yönlendirme yapıldığını işaretle
        }
        return; // Veri çekme işlemine devam etme
      }

      try {
        const response = await axios.get("/tweet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTweets(response.data);
      } catch (error) {
        console.error("Tweet'ler alınırken bir hata oluştu", error);
      }
    };

    fetchTweets();
  }, [history]); // Bağımlılık listesinden isLoggedIn çıkarıldı

  // Tweet ekleme işlemi
  const handleAddTweet = async (e) => {
    e.preventDefault();
    if (!tweetText.trim()) {
      alert("Tweet boş olamaz!");
      return;
    }

    try {
      const newTweet = { text: tweetText, userId: user.id };
      const response = await axios.post("/tweet/create", newTweet);
      setTweets([response.data, ...tweets]);
      setTweetText("");
    } catch (error) {
      console.error("Tweet eklenirken bir hata oluştu", error);
    }
  };

  // Tweet silme işlemi
  const handleDeleteTweet = async (tweetId) => {
    try {
      await axios.delete(`/tweet/delete/${tweetId}`);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error("Tweet silinirken bir hata oluştu", error);
    }
  };

  // Çıkış işlemi
  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token"); // Token'ı sil
    setIsLoggedIn(false); // Yönlendirme için isLoggedIn state'ini sıfırla
    history.push("/login"); // Login sayfasına yönlendir
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Ana Sayfa</h1>

        {/* Login/Logout Bilgisi */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <p className="text-sm">Hoş geldiniz, {user.username}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <button
              onClick={() => history.push("/login")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Giriş Yap
            </button>
          )}
        </div>
      </div>

      {/* Tweet ekleme formu */}
      <form onSubmit={handleAddTweet} className="mb-4">
        <textarea
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="Tweetinizi buraya yazın..."
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="4"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tweet Gönder
        </button>
      </form>

      {/* Tweet listesi */}
      <div>
        {Array.isArray(tweets) && tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="border p-4 mb-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{tweet.user.username}</p>
                <p>{tweet.text}</p>
              </div>
              <button
                onClick={() => handleDeleteTweet(tweet.id)}
                className="text-red-500"
              >
                Sil
              </button>
            </div>
          ))
        ) : (
          <p>No tweets available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
