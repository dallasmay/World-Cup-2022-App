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
import Ro16Page from "./pages/Ro16Page/Ro16Page";
import QuarterFinalPage from "./pages/QuarterFinalPage/QuarterFinalPage";
import SemifinalPage from "./pages/SemifinalPage/SemifinalPage";
import FinalsPage from "./pages/FinalsPage/FinalsPage";
import H2HSelectionPage from "./pages/H2HSelectionPage/H2HSelectionPage";

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
  const isLoading = useSelector((state) => state.auth.isLoading);
  const groupsArr = useSelector((state) => state.bracket.groupsArr);
  const ro16Arr = useSelector((state) => state.bracket.ro16Arr);
  const quarterFinalsArr = useSelector((state) => state.bracket.quarterFinalsArr);

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
      // dispatch(authActions.setIsLoading(true));
      axios.post(`${URL}/user`, { userId: userId }).then((res) => {
        dispatch(authActions.setTeamName(res.data.team_name));
        dispatch(authActions.setUserScore(res.data.score));
        dispatch(
          authActions.setGroupStageProgress({
            a: res.data.a_is_seen,
            b: res.data.b_is_seen,
            c: res.data.c_is_seen,
            d: res.data.d_is_seen,
            e: res.data.e_is_seen,
            f: res.data.f_is_seen,
            g: res.data.g_is_seen,
            h: res.data.h_is_seen,
          })
        );
        if (
          res.data.a_is_seen &&
          res.data.b_is_seen &&
          res.data.c_is_seen &&
          res.data.d_is_seen &&
          res.data.e_is_seen &&
          res.data.f_is_seen &&
          res.data.g_is_seen &&
          res.data.h_is_seen
        ) {
          dispatch(authActions.setisGroupStageComplete(true))
        }
          axios.post(`${URL}/bracket/group-stage`, { userId }).then((res) => {
            dispatch(bracketActions.setBracket(res.data[0]));
            dispatch(bracketActions.setGroupsArr(res.data[0].rows));
            dispatch(bracketActions.setRo16Arr(res.data[0].rows));
            dispatch(bracketActions.setRo16Winners(res.data[1].rows));
            dispatch(bracketActions.setQuarterFinalsArr(res.data[1].rows));
            if ((res.data[1].rows).length === 8) {
              dispatch(authActions.setIsQuarterFinalsComplete(true))
            } 
            dispatch(authActions.setIsLoading(false));
            console.log(res.data)
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
        <Route
          path="/group-stage"
          element={isLoading ? <Loading /> : <GroupStagePage />}
        />
        <Route
          path="/group-stage/group-a"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[0]} />
            )
          }
        />
        <Route
          path="/group-stage/group-b"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[1]} />
            )
          }
        />
        <Route
          path="/group-stage/group-c"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[2]} />
            )
          }
        />
        <Route
          path="/group-stage/group-d"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[3]} />
            )
          }
        />
        <Route
          path="/group-stage/group-e"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[4]} />
            )
          }
        />
        <Route
          path="/group-stage/group-f"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[5]} />
            )
          }
        />
        <Route
          path="/group-stage/group-g"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[6]} />
            )
          }
        />
        <Route
          path="/group-stage/group-h"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[7]} />
            )
          }
        />
        <Route path="/ro16" element={isLoading ? <Loading /> : <Ro16Page />} />
        <Route
          path="/ro16/game-49"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[0]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-51"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[1]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-50"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[2]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-52"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[3]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-53"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[4]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-55"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[5]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-54"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[6]}
              />
            )
          }
        />
        <Route
          path="/ro16/game-56"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage
                group={ro16Arr[7]}
              />
            )
          }
        />
        <Route
          path="/quarterfinals"
          element={isLoading ? <Loading /> : <QuarterFinalPage />}
        />
        <Route
          path="/semifinals"
          element={isLoading ? <Loading /> : <SemifinalPage />}
        />
        <Route
          path="/finals"
          element={isLoading ? <Loading /> : <FinalsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
