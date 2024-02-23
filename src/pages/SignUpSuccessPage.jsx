import React from "react";
import { HeaderUserLog } from "../components/common";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const SignUpSuccessPage = () => (
  <div>
    <Helmet>
      <title>Sign Up Success</title>
    </Helmet>
    <HeaderUserLog title="Connect" />
    <div className="container custom-container d-flex justify-content-center align-items-center move-up">
      <div className="row no-margin justify-content-center">
        <div className="col-md-9 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center">Sign Up Success</h2>
          <p className="text-center">
            Thank you for signing up! Please check your email to confirm your
            sign up.
          </p>
          <p className="text-center mt-3">
            Return to? <Link to="/">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
