// SignInForm.js
import React, { useState } from 'react';



const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="w-100 mx-auto">
      <div className="form-group">
        <label htmlFor="email">Username</label>
        <input type="email" className="form-control" id="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password</label>
        <div className="input-group">
          <input type={showPassword ? "text" : "password"} className="form-control" id="pwd" required />
          <div className="input-group-append">
            <button id="showPassword" type="button" className="btn btn-show" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
      <a href="#" className="d-block text-center mt-3">Forgot Password?</a>
      <button type="button" className="btn btn-secondary mt-5 w-100">Create a New Account</button>
    </form>
  );
};

export default SignInForm;