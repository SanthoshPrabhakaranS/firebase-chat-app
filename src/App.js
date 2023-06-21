import Auth from "./components/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/chat";
import { auth } from "./firebase/config";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("auth_token");

  return (
    <div>
      <div className="max-w-[700px] h-full mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Chat /> : <Auth />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
