import React from "react";
import { HeaderUserLog } from "../components/common";
import { SignUpImage, SignUpForm } from "../components/Signup";
import { Helmet } from "react-helmet";

export const SignUpPage = () => (
  <div>
    <Helmet>
      <title>Sign Up</title>
    </Helmet>
    <HeaderUserLog />
    <div className="container vh-100 d-flex justify-content-center align-items-center move-up">
      <div className="row no-margin">
        <SignUpImage />
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center">Sign Up</h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  </div>
);
