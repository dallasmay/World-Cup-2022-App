import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import styles from "./SignupForm.module.css";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const signupSubmitHandler = (evt) => {
    evt.preventDefault();
    if (password === confirmPassword && email.includes("@")) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          updateProfile(auth.currentUser, {
            displayName: `${firstName}`,
          })
            .then(() => {
              console.log("Name updated successfully");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords need to match");
    }
  };

  return (
    <>
      <form onSubmit={signupSubmitHandler}>
        <label htmlFor="name-signup">Name:</label>
        <input
          type="text"
          id="name-signup"
          onChange={(evt) => setFirstName(evt.target.value)}
        />
        <label htmlFor="email-signup">Email:</label>
        <input
          type="email"
          id="email-signup"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor="password-signup">Password:</label>
        <input
          type="password"
          id="password-signup"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <label htmlFor="password-confirm-signup">Confirm Password:</label>
        <input
          type="password"
          id="password-confirm-signup"
          onChange={(evt) => setConfirmPassword(evt.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default SignupForm;
