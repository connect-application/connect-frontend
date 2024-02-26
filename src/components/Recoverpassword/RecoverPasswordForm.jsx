import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InputField } from "../common/InputField";

export const RecoverPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login/reset/token",
        {
          email: data.email,
        }
      );
      const { email, code, status } = response.data;
      if (code === "00") {
        setStatusMessage(status);
        navigate("/recover-password-success");
      }
      console.log(`Email: ${email}, Code: ${code}, Status: ${status}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setStatusMessage("Email is not registered.");
      } else {
        console.error("There was an error!", error);
      }
    }
  };

  return (
    <form className="recov-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">Reset Email</h2>
      <p className="text-center">
        Enter your email address and we'll send you a code to reset your
        password.
      </p>
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
      <div className="error-message font-weight-bold">
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Send Code
      </button>
      <p className="text-center mt-3">
        Return to? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
};
