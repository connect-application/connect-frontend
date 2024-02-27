// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./App";
import {
  SignInPage,
  SignUpPage,
  RecoverPasswordPage,
  SignUpSuccessPage,
  SignInSuccessPage,
  ResetPasswordPage,
  ResetPasswordSuccessPage,
  RecoverPasswordSuccessPage,
} from "./pages";
import { Helmet } from "react-helmet";
import "./styles/shared.css";
import HomeComponent from "./components/HomeComponent/home";
import ProfileComponent from "./components/ProfileComponent";
import Settings from "./components/Settings";
import Notification from "./components/Notifications";
import Search from "./components/Search";
import Chat from "./components/Chat";
import Create from "./components/Create";

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
        <Route path="/home" element={<Home />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />
        <Route path="/signup-success" element={<SignUpSuccessPage />} />
        <Route path="/signin-success" element={<SignInSuccessPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/reset-password-success"
          element={<ResetPasswordSuccessPage />}
        />
        <Route
          path="/recover-password-success"
          element={<RecoverPasswordSuccessPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
