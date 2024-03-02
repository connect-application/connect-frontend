import React from "react";

export const InputField = ({
  label,
  id,
  register,
  rules,
  type = "text",
  errorMessage,
  errorMessageId,
}) => (
  <div className="form-group">
    <div className="d-flex">
      <label htmlFor={id} className="me-3">
        {label}
      </label>
      <div className="error-message" errorMessageId={errorMessageId}>
        {errorMessage}
      </div>
    </div>
    <input
      {...register(id, rules)}
      type={type}
      className="form-control"
      id={id}
    />
  </div>
);
