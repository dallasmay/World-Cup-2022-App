import './App.css';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJtgCjKUxJq8jdBvU1zIloSq1rXwiTmzA",
  authDomain: "world-cup-5730e.firebaseapp.com",
  projectId: "world-cup-5730e",
  storageBucket: "world-cup-5730e.appspot.com",
  messagingSenderId: "504024501178",
  appId: "1:504024501178:web:0e364c1305c96e11116b83",
  measurementId: "G-CF9TD0RWV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
