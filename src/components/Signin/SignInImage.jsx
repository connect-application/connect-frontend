import React from "react";
import signInImage from "../../assets/img/logos/signIn.png";

export const SignInImage = () => (
  <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
    <img src={signInImage} className="img-fluid mx-auto" alt="Sign In" />
  </div>
);
