import styles from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <>
      <form>
        <label htmlFor="email-login">Email:</label>
        <input type="email" id="email-login" />
        <label htmlFor="password-login">Password:</label>
        <input type="password" id="password-login" />
        <button>Login</button>
      </form>
    </>
  );
}

export default LoginForm;