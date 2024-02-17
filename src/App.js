// App.js
import React from 'react';
import Head from './components/Signin/Head.js';
import Header from './components/Signin/Header.js';
import SignInImage from './components/Signin/SignInImage.js';
import SignInForm from './components/Signin/SignInForm.js';

const App = () => (
  <div>
    <Head />
    <Header />
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

export default App;