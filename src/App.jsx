// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./App";
import { UserProvider } from "./components/common/UserContext";
import {
  SignInPage,
  SignUpPage,
  RecoverPasswordPage,
  SignUpSuccessPage,
  SignInSuccessPage,
  ResetPasswordPage,
  ChatPage,
  GroupPage,
  ResetPasswordSuccessPage,
  RecoverPasswordSuccessPage,
  NewActivityPage,
  ProfilePage,
  NewActivitySuccessPage,
  ProfileEditPage,
  SearchPage,
} from "./pages";
import { Helmet } from "react-helmet";
import "./styles/shared.css";
import HomeComponent from "./components/HomeComponent/home";
// import Settings from "./components/Settings";
import Notification from "./components/Notifications";
import Posts from "./components/Posts";
import { NewPostSuccessPage } from "./pages/NewPostSuccessPage";

function App() {
  return (
    <UserProvider>
      <div>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/recover-password" element={<RecoverPasswordPage />} />
          <Route path="/signup-success" element={<SignUpSuccessPage />} />
          <Route path="/signin-success" element={<SignInSuccessPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create-activity" element={<NewActivityPage />} />
          <Route
            path="/create-activity/success"
            element={<NewActivitySuccessPage />}
          />
          <Route path="/create-post" element={<Posts />} />
          <Route
            path="/create-post/success"
            element={<NewPostSuccessPage />}
          />
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
    </UserProvider>
  );
}

export default App;
