import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { InputField } from "../common/InputField";

export const NewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password", "");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/password/reset",
        {
          email: email,
          token: token,
          newPassword: data.password,
        }
      );
      const { email: responseEmail, code, status } = response.data;
      if (code === "00") {
        navigate("/reset-password-success");
      } else {
        console.log(
          `Email: ${responseEmail}, Code: ${code}, Status: ${status}`
        );
      }
    } catch (error) {
      console.error("There was an error!", error);
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
        rules={{ required: "* Password is required" }}
        type="password"
        errorMessage={errors.password && errors.password.message}
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
      />
      <button type="submit" className="btn btn-primary w-100">
        Reset
      </button>
      <p className="text-center mt-3">
        Return to? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
};