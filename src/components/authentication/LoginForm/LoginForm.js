import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../../reduxStore/store";

import Button from "../../Button/Button";
import { ReactComponent as VisibilityIcon } from "../../../assets/icons/VisibilityIcon.svg";
import { ReactComponent as HiddenVisibilityIcon } from "../../../assets/icons/HiddenVisibilityIcon.svg";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const auth = getAuth();

  const signIn = (evt) => {
    evt.preventDefault();
    dispatch(authActions.setIsLoading(true));
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      dispatch(authActions.setIsLoading(false));
      navigate("/home");
    }).catch((err) => {
      dispatch(authActions.setIsLoading(false));
      alert(err);
    });
  };

  return (
    <>
      <form onSubmit={signIn} className={styles["login-form"]}>
        <div className={styles["input-container"]}>
          <input
            type="email"
            placeholder="Email"
            id="email-login"
            className={styles["auth-input"]}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div
          className={`${styles["input-container"]} ${styles["password-container"]}`}
        >
          <input
            type={isPasswordHidden ? "password" : "text"}
            placeholder="Password"
            id="password-login"
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
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
