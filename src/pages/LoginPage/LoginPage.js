import { Link } from "react-router-dom";

import LoginForm from "../../components/authentication/LoginForm/LoginForm";


import styles from "./LoginPage.module.css";
import { ReactComponent as WCLogo } from "../../assets/icons/SoccerBallLogo.svg";

const LoginPage = () => {
  return (
    <div className={styles["content-container"]}>
      <div className={styles["logo-container"]}>
        <WCLogo className={styles["wc-logo"]} />
      </div>
      <LoginForm />
      <div className={styles["link-container"]}>
        <Link to="/register" className={styles["login-link"]}>
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
