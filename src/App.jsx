// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignInPage, SignUpPage , RecoverPasswordPage} from './pages';


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/recover-password" element={<RecoverPasswordPage />} />
    </Routes>
  );
};

export default App;