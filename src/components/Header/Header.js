import { getAuth, signOut } from "firebase/auth";
import { redirect, Link } from "react-router-dom";

const Header = ({ logOut, isAuthenticated }) => {
  const auth = getAuth();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Header</h1>
      <Link to="/login">
        <button onClick={userSignOut}>
          Logout
        </button>
      </Link>
    </>
  );
};

export default Header;
