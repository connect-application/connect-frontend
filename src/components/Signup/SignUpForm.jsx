// SignUpForm.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="w-100 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          {...register("username", { required: "Username is required." })}
          type="text"
          className="form-control"
          id="username"
        />
        <div className="error-message">
          {errors.username && errors.username.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format.",
            },
          })}
          type="email"
          className="form-control"
          id="email"
        />
        <div className="error-message">
          {errors.email && errors.email.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password</label>
        <input
          {...register("password", { required: "Password is required." })}
          type="password"
          className="form-control"
          id="pwd"
        />
        <div className="error-message">
          {errors.password && errors.password.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="confirmPwd">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "Confirm password is required.",
            validate: (value) =>
              value === watch("password") || "Passwords do not match.",
          })}
          type="password"
          className="form-control"
          id="confirmPwd"
        />
        <div className="error-message">
          {errors.confirmPassword && errors.confirmPassword.message}
        </div>
      </div>
      <div className="form-group form-check">
        <input
          {...register("termsCheck", {
            required: "You must accept the terms and privacy policy.",
          })}
          type="checkbox"
          className="form-check-input"
          id="termsCheck"
        />
        <label className="form-check-label" htmlFor="termsCheck">
          By signing up, you agree to our{" "}
          <a href="#">Terms and Privacy Policy</a>
        </label>
        <div className="error-message">
          {errors.termsCheck && errors.termsCheck.message}
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Sign Up
      </button>
      <p className="text-center mt-3">
        Already a member? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
};
