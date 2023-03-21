import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../Reducer";
import { useStateValue } from "../StateProvider";
import "./login.css";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" />
        <div className="login-text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
