import './App.css';
import { Route, Routes } from 'react-router-dom';

import AuthPage from './pages/AuthPage/AuthPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
