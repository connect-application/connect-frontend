import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../common/InputField";
import { recoverPassword } from "../../services/authService";

export const RecoverPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { email, code, status } = await recoverPassword(data.email);
      if (code === "00") {
        setErrorMessage(status);
        navigate("/recover-password-success");
      }
      console.log(`Email: ${email}, Code: ${code}, Status: ${status}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Email is not registered.");
      } else {
        setErrorMessage("There was an error!");
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
        Send Code
      </button>
      <p className="text-center mt-3">
        Return to? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
};
