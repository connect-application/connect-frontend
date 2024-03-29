import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { InputField } from "../common/InputField";
import { resetPassword } from "../../services/authService";

export const NewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password", "");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const onSubmit = async (data) => {
    try {
      const {
        email: responseEmail,
        code,
        status,
      } = await resetPassword(email, token, data.password);
      if (code === "00") {
        navigate("/reset-password-success");
      } else {
        setErrorMessage(status);
      }
      console.log(`Email: ${responseEmail}, Code: ${code}, Status: ${status}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Invalid token or password.");
      } else {
        setErrorMessage("There was an error!");
      }
    }
  };

  return (
    <form className="recov-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">New Password</h2>
      <p className="text-center">
        Please enter your new password. This will be the password you'll use to
        access your account moving forward.
      </p>
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
        Reset
      </button>
      <p className="text-center mt-3">
        Return to? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
};
