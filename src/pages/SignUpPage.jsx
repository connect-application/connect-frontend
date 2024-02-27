import React from "react";
import { HeaderUserLog } from "../components/common";
import { SignUpImage, SignUpForm } from "../components/Signup";
import { Helmet } from "react-helmet";

export const SignUpPage = () => (
  <div>
    <Helmet>
      <title>Sign Up</title>
    </Helmet>
    <div className="container d-flex align-items-center justify-content-center vh-100 container-page">
      <HeaderUserLog />
      <div className="row">
        <SignUpImage />
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <SignUpForm />
        </div>
      </div>
    </div>
    <style type="text/css">
      {`
        .container-page{
          min-height: 800px;
        }
        @media (min-width: 992px) {  
          .container-page{
            min-height: 1000px;
          }
        }
      `}
    </style>
  </div>
);
