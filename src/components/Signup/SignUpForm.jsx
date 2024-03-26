import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import { useForm } from "react-hook-form";
import { InputField } from "../common";
import { signup } from "../../services/authService"; // import signup function from authService

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // initialize useNavigate
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const { email, code, status } = await signup(data);
      if (code === "00") {
        setErrorMessage(status);
        navigate("/signup-success"); // navigate to success page
      }
      console.log(`Email: ${email}, Code: ${code}, Status: ${status}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Email or username is already registered.");
      } else {
        setErrorMessage("There was an error!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup_form">
      <h2 className="text-center">Sign Up</h2>
      <InputField
        label="First Name"
        id="firstName"
        register={register}
        rules={{
          required: "* First name is required",
          maxLength: {
            value: 50,
            message: "* First name cannot exceed 50 characters",
          },
        }}
        errorMessage={errors.firstName && errors.firstName.message}
        errorMessageId="firstName_error"
      />
      <InputField
        label="Last Name"
        id="lastName"
        register={register}
        rules={{
          required: "* Last name is required",
          maxLength: {
            value: 50,
            message: "* Last name cannot exceed 50 characters",
          },
        }}
        errorMessage={errors.lastName && errors.lastName.message}
        errorMessageId="lastName_error"
      />
      <InputField
        label="Username"
        id="username"
        register={register}
        rules={{
          required: "* Username is required",
          maxLength: {
            value: 12,
            message: "* Username cannot exceed 12 characters",
          },
        }}
        errorMessage={errors.username && errors.username.message}
        errorMessageId="username_error"
      />
      <InputField
        label="Email"
        id="email"
        register={register}
        rules={{
          required: "* Email is required",
          maxLength: {
            value: 62,
            message: "* Email cannot exceed 62 characters",
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "* Invalid email address",
          },
        }}
        type="email"
        errorMessage={errors.email && errors.email.message}
        errorMessageId="email_error"
      />
      <InputField
        label="Password"
        id="password"
        register={register}
        rules={{
          required: "* Password is required",
          maxLength: {
            value: 20,
            message: "* Password cannot exceed 20 characters",
          },
          minLength: {
            value: 6,
            message: "* Password must have at least 6 characters",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message: "* Password not secure enough",
          },
        }}
        type="password"
        errorMessage={errors.password && errors.password.message}
        errorMessageId="password_error"
      />
      <InputField
        label="Confirm Password"
        id="confirmPassword"
        register={register}
        rules={{
          required: "* Please confirm your password",
          validate: (value) =>
            value === password || "* The passwords do not match",
        }}
        type="password"
        errorMessage={errors.confirmPassword && errors.confirmPassword.message}
        errorMessageId="confirmPassword_error"
      />
      <InputField
        label="Date of Birth"
        id="dateOfBirth"
        register={register}
        rules={{ required: "* Date of birth is required" }}
        type="date"
        errorMessage={errors.dateOfBirth && errors.dateOfBirth.message}
        errorMessageId="dateOfBirth_error"
      />
      <div className="form-group form-check">
        <input
          {...register("termsCheck", {
            required: " * Must accept the terms and privacy policy",
          })}
          type="checkbox"
          className="form-check-input"
          id="termsCheck"
        />
        <label className="form-check-label" htmlFor="termsCheck">
          By signing up, you agree to our{" "}
          <a href="#">Terms and Privacy Policy</a>
        </label>
        <div className="error-message" errorMessageId="checkbox_error">
          {errors.termsCheck && errors.termsCheck.message}
        </div>
      </div>
      <div style={{ position: "relative", paddingBottom: "30px" }}>
        {errorMessage && (
          <div
            className="error-message"
            style={{ position: "absolute", top: "0", left: "0" }}
            errorMessageId="error_message"
          >
            {errorMessage}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Sign Up
      </button>

      <p className="text-center mt-3 sign-in-link">
        Already a member? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
};
