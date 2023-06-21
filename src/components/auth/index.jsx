import React from "react";
import { Google } from "../../icons/icons";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Auth = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const _signInHandler = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider);
    cookies.set("auth_token", auth?.currentUser?.refreshToken);
    navigate("/chat");
  };

  return (
    <div className="w-full h-[calc(100vh_-_1rem)] flex justify-center items-center">
      <button
        onClick={_signInHandler}
        className=" flex items-center gap-3 font-medium p-2 border shadow-sm"
      >
        <span>{Google}</span>
        Sign In With Google
      </button>
    </div>
  );
};

export default Auth;
