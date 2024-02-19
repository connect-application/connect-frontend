import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  //const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    //console.log(data); // Login function
    //navigate('/profile'); // Path to navigate to
  };


  return (
    <form className="w-100 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input {...register('username', { required: 'Username is required' })} type="username" className="form-control" id="username" />
        <div className="error-message">{errors.username && <p>{errors.username.message}</p>}</div>
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password</label>
        <div className="input-group">
          <input {...register('password', { required: 'Password is required' })} type={showPassword ? "text" : "password"} className="form-control" id="pwd" />
          <div className="input-group-append">
            <button id="showPassword" type="button" className="btn btn-show" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="error-message">{errors.password && <p>{errors.password.message}</p>}</div>
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
      <Link to="/recover-password" className="d-block text-center mt-3">Forgot Password?</Link>
      <Link to="/signup" className="btn btn-secondary mt-5 w-100">Create new account</Link>
    </form>
  );
};

export default SignInForm;