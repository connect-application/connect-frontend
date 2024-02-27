import React from "react";
import { HeaderUserLog } from "../components/common";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const SignInSuccessPage = () => (
  <div>
    <Helmet>
      <title>Sign In Success</title>
    </Helmet>
    <div className="container d-flex align-items-center justify-content-center vh-100 container-page">
      <HeaderUserLog />
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center">Sign In Success</h2>
        <p className="text-center">
          You have successfully signed in! You can now access your account.
        </p>
        <p className="text-center mt-3">
          Return to? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  </div>
);
