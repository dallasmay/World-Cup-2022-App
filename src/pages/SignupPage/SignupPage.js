import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import SignupForm from "../../components/authentication/SignupForm/SignupForm";
import Loading from "../../components/Loading/Loading";

import { authActions } from "../../reduxStore/store";

import { ReactComponent as WCLogo } from "../../assets/icons/SoccerBallLogo.svg";

import styles from "./SignupPage.module.css";

const SignupPage = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.setIsLoading(false));
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles["content-container"]}>
      <div className={styles["logo-container"]}>
        <WCLogo className={styles["wc-logo"]} />
      </div>
      <SignupForm />
      <div className={styles["link-container"]}>
        <Link to="/login" className={styles["login-link"]}>
          I have an account
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
