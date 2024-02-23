import React from "react";
import { HeaderUserLog } from "../components/common";
import { Helmet } from "react-helmet";

export const SignInSuccessPage = () => (
  <div>
    <Helmet>
      <title>Sign In Success</title>
    </Helmet>
    <HeaderUserLog title="Connect" />
    <div className="container custom-container d-flex justify-content-center align-items-center move-up">
      <div className="row no-margin justify-content-center">
        <div className="col-md-9 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center">Sign In Success</h2>
          <p className="text-center">
            You have successfully signed in! You can now access your account.
          </p>
        </div>
      </div>
    </div>
  </div>
);
