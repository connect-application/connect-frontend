import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { InputField, PasswordInputField } from "../common";
import axios from "axios";
import { login } from "../../services/authService";
import { useUser } from "../common";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      const {
        id,
        firstName,
        lastName,
        userName,
        email,
        dateOfBirth,
        jwtToken,
        code,
        status,
      } = response;
      if (code === "00") {
        setUser({ id, firstName, lastName, userName });
        localStorage.setItem("jwtToken", jwtToken); // store the JWT token
        localStorage.setItem("userId", id); // store the user ID
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("jwtToken")}`;
        navigate("/home"); // navigate to profile pages
      } else {
        setErrorMessage(status);
      }
      console.log(
        `Email: ${email}, JWT Token: ${jwtToken}, Code: ${code}, Status: ${status}`
      );
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("There was an error!");
        console.error("There was an error!", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">Sign In</h2>
      <InputField
        label="Email"
        id="email"
        register={register}
        rules={{
          required: "* Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "* Invalid email address",
          },
        }}
        type="email"
        errorMessage={errors.email && errors.email.message}
        errorMessageId="email_error"
      />
      <PasswordInputField
        label="Password"
        id="password"
        register={register}
        rules={{ required: "* Password is required" }}
        errorMessage={errors.password && errors.password.message}
        errorMessageId="password_error"
      />
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
        Submit
      </button>
      <Link to="/recover-password" className="d-block text-center mt-3">
        Forgot Password?
      </Link>
      <Link to="/signup" className="btn btn-secondary mt-5 w-100">
        Create new account
      </Link>
    </form>
  );
};
