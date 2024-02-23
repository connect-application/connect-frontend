import React, { useState } from "react";

export const PasswordInputField = ({
  label,
  id,
  register,
  rules,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-group">
        <input
          {...register(id, rules)}
          type={showPassword ? "text" : "password"}
          className="form-control"
          id={id}
        />
        <div className="input-group-append">
          <button
            id="showPassword"
            type="button"
            className="btn btn-show"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};
