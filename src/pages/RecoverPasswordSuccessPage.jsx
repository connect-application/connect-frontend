import React from "react";
import { HeaderUserLog } from "../components/common";
import { Helmet } from "react-helmet";

export const RecoverPasswordSuccessPage = () => (
  <div>
    <Helmet>
      <title>Success</title>
    </Helmet>
    <div className="container d-flex align-items-center justify-content-center vh-100 container-page">
      <HeaderUserLog />
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center">Password Reset Request Success</h2>
        <p className="text-center">
          Your password reset request has been received! An email will be sent
          to you shortly with a link to reset your password.
        </p>
      </div>
    </div>
  </div>
);
