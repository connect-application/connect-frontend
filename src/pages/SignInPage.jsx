import React from "react";
import { HeaderUserLog } from "../components/common";
import { SignInImage, SignInForm } from "../components/Signin";
import { Helmet } from "react-helmet";

export const SignInPage = () => (
  <div>
    <Helmet>
      <title>Sign In</title>
    </Helmet>
    <div className="container d-flex align-items-center justify-content-center vh-100 container-page">
      <HeaderUserLog />
      <div className="row auth-form">
        <SignInImage />
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <SignInForm />
        </div>
      </div>
    </div>
  </div>
);
