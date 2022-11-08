import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../../Button/Button";
import { ReactComponent as VisibilityIcon } from "../../../assets/icons/VisibilityIcon.svg";
import { ReactComponent as HiddenVisibilityIcon } from "../../../assets/icons/HiddenVisibilityIcon.svg";

import styles from "./SignupForm.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const SignupForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);



  const auth = getAuth();

  const signupSubmitHandler = (evt) => {
    evt.preventDefault();
    if (email.includes("@")) {
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

          axios.post(`${URL}/register`, {
            userId: userCredential.user.uid,
            name: firstName,
          }).then(() => {
            console.log("User registered in supabase");
            axios
              .post(`${URL}/bracket/default`, {userId: userCredential.user.uid})
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
            navigate("/register/pick-team")
          }).catch(err => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      alert("Must enter valid email");
    }
  };

  

    return (
      <>
        <form onSubmit={signupSubmitHandler} className={styles["signup-form"]}>
          {/* <label htmlFor="name-signup">Name:</label> */}
          <div className={styles["input-container"]}>
            <input
              type="text"
              placeholder="Name"
              id="name-signup"
              className={styles["auth-input"]}
              onChange={(evt) => setFirstName(evt.target.value)}
            />
          </div>
          {/* <label htmlFor="email-signup">Email:</label> */}
          <div className={styles["input-container"]}>
            <input
              type="email"
              placeholder="Email"
              id="email-signup"
              className={styles["auth-input"]}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          {/* <label htmlFor="password-signup">Password:</label> */}
          <div
            className={`${styles["input-container"]} ${styles["password-container"]}`}
          >
            <input
              type={isPasswordHidden ? "password" : "text"}
              placeholder="Password"
              id="password-signup"
              className={styles["auth-input"]}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            {isPasswordHidden ? (
              <HiddenVisibilityIcon
                className={styles["eye-icons"]}
                onClick={() => {
                  setIsPasswordHidden((prevState) => !prevState);
                }}
              />
            ) : (
              <VisibilityIcon
                className={styles["eye-icons"]}
                onClick={() => {
                  setIsPasswordHidden((prevState) => !prevState);
                }}
              />
            )}
          </div>
          <div className={styles["create-acct-btn-container"]}>
            <Button type="submit">Create account</Button>
          </div>
        </form>
      </>
    );
};

export default SignupForm;
