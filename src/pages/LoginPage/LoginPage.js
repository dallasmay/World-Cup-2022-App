import { Link } from "react-router-dom";

import LoginForm from "../../components/authentication/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <LoginForm/>
      <Link to="/register">Sign Up</Link>
    </>
  );
};

export default LoginPage;
