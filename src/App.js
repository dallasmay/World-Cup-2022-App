import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setIsAuthenticated(true);
        setUserId(user.uid);
      } else {
        console.log("User is signed out??");
      }
    });
  }, []);

  const logOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <Header logOut={logOut} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <LoginPage />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <HomePage /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <HomePage /> : <SignupPage />
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
