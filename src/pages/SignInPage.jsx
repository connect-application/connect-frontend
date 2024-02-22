import React from "react";
import { HeaderUserLog } from "../components/common";
import { SignInImage, SignInForm } from "../components/Signin";
import { Helmet } from "react-helmet";

export const SignInPage = () => (
  <div>
    <Helmet>
      <title>Sign In</title>
    </Helmet>
    <HeaderUserLog />
    <div className="container vh-100 d-flex justify-content-center align-items-center move-up">
      <div className="row no-margin">
        <SignInImage />
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center">Sign In</h2>
          <SignInForm />
        </div>
      </div>
    </div>
  </div>
);
