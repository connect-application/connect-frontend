import React from 'react';
import {HeadUserLog, HeaderUserLog} from '../components/common';
import {SignUpImage, SignUpForm} from '../components/Signup';


export const SignUpPage = () => (
  <div>
    <HeadUserLog />
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
