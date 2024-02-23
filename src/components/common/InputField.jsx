import React from "react";

export const InputField = ({
  label,
  id,
  register,
  rules,
  type = "text",
  errorMessage,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      {...register(id, rules)}
      type={type}
      className="form-control"
      id={id}
    />
    <div className="error-message">{errorMessage}</div>
  </div>
);
