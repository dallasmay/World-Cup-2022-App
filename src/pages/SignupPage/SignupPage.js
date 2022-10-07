import { Link } from "react-router-dom";

import SignupForm from "../../components/authentication/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <>
      <h1>SignupPage</h1>
      <SignupForm />
      <Link to="/login">Already have an account? Login here</Link>
    </>
  );
}

export default SignupPage;