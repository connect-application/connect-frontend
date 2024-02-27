import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { InputField, PasswordInputField } from "../common";
import axios from "axios";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", {
        email: data.email,
        password: data.password,
      });
      const { email, jwtToken, code, status } = response.data;
      if (code === "00") {
        localStorage.setItem("jwtToken", jwtToken); // store the JWT token
        navigate("/signin-success"); // navigate to profile page
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
      />
      <PasswordInputField
        label="Password"
        id="password"
        register={register}
        rules={{ required: "* Password is required" }}
        errorMessage={errors.password && errors.password.message}
      />
      <div style={{ position: "relative", paddingBottom: "30px" }}>
        {errorMessage && (
          <div
            className="error-message"
            style={{ position: "absolute", top: "0", left: "0" }}
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
