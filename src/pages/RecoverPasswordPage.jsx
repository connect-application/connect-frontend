import React from "react";
import { HeaderUserLog } from "../components/common";
import { RecoverPasswordForm } from "../components/Recoverpassword";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const RecoverPasswordPage = () => (
  <div>
    <Helmet>
      <title>Reset Password</title>
    </Helmet>
    <HeaderUserLog title="Connect" />
    <div className="container custom-container d-flex justify-content-center align-items-center move-up">
      <div className="row no-margin justify-content-center">
        <div className="col-md-9 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center">Reset Password</h2>
          <p className="text-center">
            Enter your email address and we'll send you a code to reset your
            password.
          </p>
          <RecoverPasswordForm />
          <p className="text-center mt-3">
            Return to? <Link to="/">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
