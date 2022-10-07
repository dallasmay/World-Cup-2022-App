import styles from "./SignupForm.module.css";

const SignupForm = () => {
  return (
    <>
      <form>
        <label htmlFor="name-signup">Name:</label>
        <input type="text" id="name-signup" />
        <label htmlFor="email-signup">Email:</label>
        <input type="email" id="email-signup" />
        <label htmlFor="password-signup">Password:</label>
        <input type="password" id="password-signup" />
        <button>Register</button>
      </form>
    </>
  );
}

export default SignupForm;