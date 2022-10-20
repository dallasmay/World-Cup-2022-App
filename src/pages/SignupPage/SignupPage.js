import { Link } from "react-router-dom";

import SignupForm from "../../components/authentication/SignupForm/SignupForm";

import styles from "./SignupPage.module.css";
import { ReactComponent as WCLogo } from "../../assets/icons/SoccerBallLogo.svg";

const SignupPage = () => {
  return (
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
