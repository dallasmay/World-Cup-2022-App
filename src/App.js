import "./App.css";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { authActions, bracketActions } from "./reduxStore/store";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import PickTeamNamePage from "./pages/PickTeamNamePage/PickTeamNamePage";
import HomePage from "./pages/HomePage/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import GroupStagePage from "./pages/GroupStagePage/GroupStagePage";
import GroupSelectionPage from "./pages/GroupSelectionPage/GroupSelectionPage";

import Loading from "./components/Loading/Loading";
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const teamName = useSelector((state) => state.auth.teamName);
  const isLoading = useSelector((state) => state.auth.isLoading)

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
      dispatch(authActions.setIsLoading(true))
      axios.post(`${URL}/user`, { userId: userId }).then((res) => {
        dispatch(authActions.setTeamName(res.data.team_name));
        axios.post(`${URL}/bracket/group-stage`, { userId }).then((res) => {
          dispatch(bracketActions.setBracket(res.data[0]));
          dispatch(
            bracketActions.setGroupsArr([
              [res.data[0][0], res.data[0][1], res.data[0][2], res.data[0][3]],
              [res.data[0][4], res.data[0][5], res.data[0][6], res.data[0][7]],
              [
                res.data[0][8],
                res.data[0][9],
                res.data[0][10],
                res.data[0][11],
              ],
              [
                res.data[0][12],
                res.data[0][13],
                res.data[0][14],
                res.data[0][15],
              ],
              [
                res.data[0][16],
                res.data[0][17],
                res.data[0][18],
                res.data[0][19],
              ],
              [
                res.data[0][20],
                res.data[0][21],
                res.data[0][22],
                res.data[0][23],
              ],
              [
                res.data[0][24],
                res.data[0][25],
                res.data[0][26],
                res.data[0][27],
              ],
              [
                res.data[0][28],
                res.data[0][29],
                res.data[0][30],
                res.data[0][31],
              ],
            ])
          );
          dispatch(authActions.setIsLoading(false));
        });
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
            isLoading ? (
              <Loading />
            ) : isAuthenticated &&
              teamName !== null &&
              teamName !== undefined ? (
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
            isAuthenticated && teamName !== null && teamName !== undefined ? (
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
            isAuthenticated && teamName !== null && teamName !== undefined ? (
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
            isLoading ? (
              <Loading />
            ) : isAuthenticated &&
              teamName !== null &&
              teamName !== undefined ? (
              <Navigate to="/home" />
            ) : (isAuthenticated && teamName === null) ||
              (isAuthenticated && teamName === undefined) ? (
              <PickTeamNamePage />
            ) : (
              <SignupPage />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated && teamName !== null && teamName !== undefined ? (
              <HomePage />
            ) : isAuthenticated && teamName === null ? (
              <Navigate to="/register/pick-team" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/group-stage" element={isLoading ? (
              <Loading />
            ) : <GroupStagePage />} />
        <Route path="/group-stage/group-B" element={<GroupSelectionPage />} />
      </Routes>
    </>
  );
}

export default App;
