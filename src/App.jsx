// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  SignInPage,
  SignUpPage,
  RecoverPasswordPage,
  SignUpSuccessPage,
  SignInSuccessPage,
} from "./pages";
import { Helmet } from "react-helmet";
import "./styles/shared.css";

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />
        <Route path="/signup-success" element={<SignUpSuccessPage />} />
        <Route path="/signin-success" element={<SignInSuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
