import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Yönlendirme için state

  // Sayfa ilk yüklendiğinde tüm tweet'leri al
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("/tweet");
        setTweets(response.data);
      } catch (error) {
        console.error("Tweet'ler alınırken bir hata oluştu", error);
      }
    };

    fetchTweets();
  }, []); // Bağımlılık listesinden isLoggedIn çıkarıldı

  // Tweet ekleme işlemi
  const handleAddTweet = async (e) => {
    e.preventDefault();
    if (!tweetText.trim()) {
      alert("Tweet boş olamaz!");
      return;
    }

    try {
      const newTweet = { content: tweetText, userId: user.id };
      const response = await axios.post(
        "http://localhost:3000/workintech/twitter/tweet/create",
        newTweet
      );
      setTweets([response.data, ...tweets]);
      setTweetText("");
    } catch (error) {
      console.error("Tweet eklenirken bir hata oluştu", error);
    }
  };

  // Tweet silme işlemi
  const handleDeleteTweet = async (tweetId) => {
    try {
      await axios.delete(
        `http://localhost:3000/workintech/twitter/tweet/delete/${tweetId}`
      );
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error("Tweet silinirken bir hata oluştu", error);
    }
  };

  // Çıkış işlemi
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false); // Yönlendirme için isLoggedIn state'ini sıfırla
    navigate("/login"); // Login sayfasına yönlendir
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
              onClick={() => navigate("/login")}
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
                <p className="font-bold">
                  {tweet.user ? tweet.user.username : "Bilinmeyen Kullanıcı"}{" "}
                  {/* user objesinin varlığını kontrol et */}
                </p>
                <p>{tweet.content}</p>
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
