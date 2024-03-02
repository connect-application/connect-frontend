import React, { useState } from "react";

export const PasswordInputField = ({
  label,
  id,
  register,
  rules,
  errorMessage,
  errorMessageId,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group">
      <div className="d-flex">
        <label htmlFor={id} className="me-3">
          {label}
        </label>
        <div className="error-message" errorMessageId={errorMessageId}>
          {errorMessage}
        </div>
      </div>
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
            className="btn-show"
            onClick={togglePasswordVisibility}
            style={{ width: "70px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    </div>
  );
};
