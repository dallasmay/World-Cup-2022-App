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
import GroupStagePage from "./pages/groupStage/GroupStagePage/GroupStagePage";
import GroupSelectionPage from "./pages/groupStage/GroupSelectionPage/GroupSelectionPage";
import Ro16Page from "./pages/ro16/Ro16Page/Ro16Page";
import QuarterFinalPage from "./pages/quarterfinals/QuarterFinalPage/QuarterFinalPage";
import SemifinalPage from "./pages/semifinals/SemifinalPage/SemifinalPage";
import FinalsPage from "./pages/finals/FinalsPage/FinalsPage";
import H2HSelectionPage from "./pages/ro16/H2HSelectionPage/H2HSelectionPage";
import QfSelectionPage from "./pages/quarterfinals/QfSelectionPage/QfSelectionPage";
import SemiSelectionPage from "./pages/semifinals/SemiSelectionPage/SemiSelectionPage";
import FinalsSelectionPage from "./pages/finals/FinalsSelectionPage/FinalsSelectionPage";

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
  const quarterFinalsArr = useSelector(
    (state) => state.bracket.quarterFinalsArr
  );
  const isRo16Complete = useSelector((state) => state.auth.isRo16Complete);
  const isQuarterFinalsComplete = useSelector(
    (state) => state.auth.isQuarterFinalsComplete
  );
  const semiFinalsArr = useSelector((state) => state.bracket.semiFinalsArr);
  const isSemiFinalsComplete = useSelector(
    (state) => state.auth.isSemiFinalsComplete
  );
  const finalsArr = useSelector((state) => state.bracket.finalsArr);
  const consolationArr = useSelector((state) => state.bracket.consolationArr);

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
      dispatch(authActions.setIsLoading(true));
      axios.post(`${URL}/user`, { userId: userId }).then((res) => {
        dispatch(authActions.setTeamName(res.data.team_name));
        dispatch(authActions.setUserScore(res.data.score));
        dispatch(
          authActions.setGroupStageProgress([
            res.data.a_is_seen,
            res.data.b_is_seen,
            res.data.c_is_seen,
            res.data.d_is_seen,
            res.data.e_is_seen,
            res.data.f_is_seen,
            res.data.g_is_seen,
            res.data.h_is_seen,
          ])
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
          dispatch(authActions.setisGroupStageComplete(true));
        }
        axios.post(`${URL}/bracket/group-stage`, { userId }).then((res) => {
          console.log(res.data);
          dispatch(bracketActions.setBracket(res.data[0]));
          dispatch(bracketActions.setGroupsArr(res.data[0].rows));
          dispatch(bracketActions.setRo16Arr(res.data[0].rows));
          dispatch(bracketActions.setRo16Winners(res.data[1].rows));
          dispatch(bracketActions.setQuarterFinalsArr(res.data[1].rows));
          dispatch(bracketActions.setQuarterFinalsWinners(res.data[2].rows));
          dispatch(bracketActions.setSemiFinalsArr(res.data[2].rows));
          dispatch(bracketActions.setFinalsArr(res.data[3].rows));
          dispatch(bracketActions.setConsolationArr(res.data[3].rows));
          dispatch(bracketActions.setSemiFinalsWinners(res.data[3].rows));
          if (res.data[4].rows.length === 1) {
            if (res.data[4].rows[0].round === "final") {
              dispatch(bracketActions.setFinalsWinner([res.data[4].rows[0]]));
            } else if (res.data[4].rows[0].round === "wCons") {
              dispatch(
                bracketActions.setConsolationWinner([res.data[4].rows[0]])
              );
            }
          } else if (res.data[4].rows.length === 0) {
            dispatch(bracketActions.setConsolationWinner([]));
            dispatch(bracketActions.setFinalsWinner([]));
          } else {
            dispatch(
              bracketActions.setConsolationWinner([res.data[4].rows[0]])
            );
            dispatch(bracketActions.setFinalsWinner([res.data[4].rows[1]]));
          }
          if (res.data[1].rows.length === 8) {
            dispatch(authActions.setIsRo16Complete(true));
          }
          if (res.data[2].rows.length === 4) {
            dispatch(authActions.setIsQuarterFinalsComplete(true));
          }
          if (res.data[3].rows.length === 4) {
            dispatch(authActions.setIsSemiFinalsComplete(true));
          }
          dispatch(authActions.setIsLoading(false));
          console.log(res.data);
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
      {isLoading && <Loading />}
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
              <GroupSelectionPage group={groupsArr[0]} key={1} />
            )
          }
        />
        <Route
          path="/group-stage/group-b"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[1]} key={2} />
            )
          }
        />
        <Route
          path="/group-stage/group-c"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[2]} key={3} />
            )
          }
        />
        <Route
          path="/group-stage/group-d"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[3]} key={4} />
            )
          }
        />
        <Route
          path="/group-stage/group-e"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[4]} key={5} />
            )
          }
        />
        <Route
          path="/group-stage/group-f"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[5]} key={6} />
            )
          }
        />
        <Route
          path="/group-stage/group-g"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[6]} key={7} />
            )
          }
        />
        <Route
          path="/group-stage/group-h"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <GroupSelectionPage group={groupsArr[7]} key={8} />
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
              <H2HSelectionPage group={ro16Arr[0]} key={9} />
            )
          }
        />
        <Route
          path="/ro16/game-51"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[1]} key={10} />
            )
          }
        />
        <Route
          path="/ro16/game-50"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[2]} key={11} />
            )
          }
        />
        <Route
          path="/ro16/game-52"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[3]} key={12} />
            )
          }
        />
        <Route
          path="/ro16/game-53"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[4]} key={13} />
            )
          }
        />
        <Route
          path="/ro16/game-55"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[5]} key={14} />
            )
          }
        />
        <Route
          path="/ro16/game-54"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[6]} key={15} />
            )
          }
        />
        <Route
          path="/ro16/game-56"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <H2HSelectionPage group={ro16Arr[7]} key={16} />
            )
          }
        />
        <Route
          path="/quarterfinals"
          element={isLoading ? <Loading /> : <QuarterFinalPage />}
        />
        <Route
          path="/quarterfinals/game-57"
          element={
            isLoading ? (
              <Loading />
            ) : isRo16Complete ? (
              <QfSelectionPage group={quarterFinalsArr[0]} key={17} />
            ) : (
              <Navigate to="/quarterfinals" />
            )
          }
        />
        <Route
          path="/quarterfinals/game-59"
          element={
            isLoading ? (
              <Loading />
            ) : isRo16Complete ? (
              <QfSelectionPage group={quarterFinalsArr[1]} key={18} />
            ) : (
              <Navigate to="/quarterfinals" />
            )
          }
        />
        <Route
          path="/quarterfinals/game-58"
          element={
            isLoading ? (
              <Loading />
            ) : isRo16Complete ? (
              <QfSelectionPage group={quarterFinalsArr[2]} key={19} />
            ) : (
              <Navigate to="/quarterfinals" />
            )
          }
        />
        <Route
          path="/quarterfinals/game-60"
          element={
            isLoading ? (
              <Loading />
            ) : isRo16Complete ? (
              <QfSelectionPage group={quarterFinalsArr[3]} key={20} />
            ) : (
              <Navigate to="/quarterfinals" />
            )
          }
        />
        <Route
          path="/semifinals"
          element={isLoading ? <Loading /> : <SemifinalPage />}
        />
        <Route
          path="/semifinals/game-61"
          element={
            isLoading ? (
              <Loading />
            ) : isQuarterFinalsComplete ? (
              <SemiSelectionPage group={semiFinalsArr[0]} />
            ) : (
              <Navigate to="/semifinals" />
            )
          }
        />
        <Route
          path="/semifinals/game-62"
          element={
            isLoading ? (
              <Loading />
            ) : isQuarterFinalsComplete ? (
              <SemiSelectionPage group={semiFinalsArr[1]} />
            ) : (
              <Navigate to="/semifinals" />
            )
          }
        />
        <Route
          path="/finals"
          element={isLoading ? <Loading /> : <FinalsPage />}
        />
        <Route
          path="/finals/game-63"
          element={
            isLoading ? (
              <Loading />
            ) : isSemiFinalsComplete ? (
              <FinalsSelectionPage group={consolationArr[0]} />
            ) : (
              <Navigate to="/finals" />
            )
          }
        />
        <Route
          path="/finals/game-64"
          element={
            isLoading ? (
              <Loading />
            ) : isSemiFinalsComplete ? (
              <FinalsSelectionPage group={finalsArr[0]} />
            ) : (
              <Navigate to="/finals" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
