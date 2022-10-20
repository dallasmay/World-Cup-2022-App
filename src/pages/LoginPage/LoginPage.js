import { Link } from "react-router-dom";

import LoginForm from "../../components/authentication/LoginForm/LoginForm";

import { ReactComponent as WCLogo } from "../../assets/icons/SoccerBallLogo.svg";

const LoginPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <WCLogo />
      <LoginForm/>
      <Link to="/register">Sign Up</Link>
    </>
  );
};

export default LoginPage;
