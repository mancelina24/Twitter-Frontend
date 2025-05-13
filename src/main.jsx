import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TweetProvider } from "./service/TweetContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <TweetProvider>
        <App />
      </TweetProvider>
    </AuthProvider>
  </BrowserRouter>
);
