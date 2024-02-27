import React from "react";
import { HeaderUserLog } from "../components/common";
import { RecoverPasswordForm } from "../components/Recoverpassword";
import { Helmet } from "react-helmet";

export const RecoverPasswordPage = () => (
  <div>
    <Helmet>
      <title>Reset Password</title>
    </Helmet>
    <div className="container d-flex align-items-center justify-content-center vh-100 container-page">
      <HeaderUserLog />
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center row">
        <RecoverPasswordForm />
      </div>
    </div>
  </div>
);
