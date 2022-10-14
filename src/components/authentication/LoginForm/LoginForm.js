import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const signIn = (evt) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      navigate("/home");
    });
  };

  return (
    <>
      <form onSubmit={signIn}>
        <label htmlFor="email-login">Email:</label>
        <input
          type="email"
          id="email-login"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor="password-login">Password:</label>
        <input
          type="password"
          id="password-login"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
