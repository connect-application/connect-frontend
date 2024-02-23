import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import { useForm } from "react-hook-form";
import { InputField } from "../common/InputField";
import axios from "axios";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate(); // initialize useNavigate
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.username,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
      });
      const { email, code, status } = response.data;
      if (code === "00") {
        setStatusMessage(status);
        navigate("/signup-success"); // navigate to success page
      }
      console.log(`Email: ${email}, Code: ${code}, Status: ${status}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setStatusMessage("Email or username is already registered.");
      } else {
        console.error("There was an error!", error);
      }
    }
  };

  return (
    <form className="w-100 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="First Name"
        id="firstName"
        register={register}
        rules={{ required: "First name is required." }}
        errorMessage={errors.firstName && errors.firstName.message}
      />
      <InputField
        label="Last Name"
        id="lastName"
        register={register}
        rules={{ required: "Last name is required." }}
        errorMessage={errors.lastName && errors.lastName.message}
      />
      <InputField
        label="Username"
        id="username"
        register={register}
        rules={{ required: "Username is required." }}
        errorMessage={errors.username && errors.username.message}
      />
      <InputField
        label="Email"
        id="email"
        register={register}
        rules={{
          required: "Email is required.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format.",
          },
        }}
        type="email"
        errorMessage={errors.email && errors.email.message}
      />
      <InputField
        label="Password"
        id="password"
        register={register}
        rules={{ required: "Password is required." }}
        type="password"
        errorMessage={errors.password && errors.password.message}
      />
      <InputField
        label="Confirm Password"
        id="confirmPassword"
        register={register}
        rules={{
          required: "Please confirm your password.",
          validate: (value) =>
            value === password || "The passwords do not match.",
        }}
        type="password"
        errorMessage={errors.confirmPassword && errors.confirmPassword.message}
      />
      <InputField
        label="Date of Birth"
        id="dateOfBirth"
        register={register}
        rules={{ required: "Date of birth is required." }}
        type="date"
        errorMessage={errors.dateOfBirth && errors.dateOfBirth.message}
      />
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
      <div className="error-message">
        {statusMessage && <div className="status-message">{statusMessage}</div>}
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
