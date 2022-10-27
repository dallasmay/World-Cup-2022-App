import "./App.css";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { authActions } from "./reduxStore/store";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import PickTeamNamePage from "./pages/PickTeamNamePage/PickTeamNamePage";
import HomePage from "./pages/HomePage/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import Header from "./components/Header/Header";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// URL
const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const userId = useSelector((state) => state.userId);
  const teamName = useSelector((state) => state.teamName);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(authActions.login());
        dispatch(authActions.setUserId(user.uid));
      } else {
        console.log("User is signed out??");
      }
    });
  }, []);

  useEffect(() => {
    console.log("test");
    if (isAuthenticated) {
      axios.post(`${URL}/user`, { userId: userId }).then((res) => {
        dispatch(authActions.setTeamName(res.data.team_name));
      });
    }
  }, [isAuthenticated]);

  const logOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      {/* <Header logOut={logOut} isAuthenticated={isAuthenticated} /> */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && teamName !== null ? (
              <Navigate to="/home" />
            ) : isAuthenticated && teamName === null ? (
              <Navigate to="/register/pick-team" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated && teamName !== null ? (
              <Navigate to="/home" />
            ) : isAuthenticated && teamName === null ? (
              <Navigate to="/register/pick-team" />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated && teamName !== null ? (
              <Navigate to="/home" />
            ) : isAuthenticated && teamName === null ? (
              <Navigate to="/register/pick-team" />
            ) : (
              <SignupPage />
            )
          }
        />
        <Route
          path="/register/pick-team"
          element={
            isAuthenticated && teamName !== null ? (
              <Navigate to="/home" />
            ) : isAuthenticated && teamName === null ? (
              <PickTeamNamePage />
            ) : (
              <SignupPage />
            )
          }
        />
        {/* <Route
          path="/home"
          element={
            isAuthenticated && teamName !== null ? (
              <HomePage />
            ) : isAuthenticated && teamName === null ? (
              <Navigate to="/register/pick-team" />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </>
  );
}

export default App;
