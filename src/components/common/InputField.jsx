import React from "react";

export const InputField = ({
  label,
  id,
  register,
  rules,
  type = "text",
  errorMessage,
  errorMessageId,
  required = false,
  value, // add the value prop
}) => (
  <div className="form-group">
    <div className="d-flex">
      <label htmlFor={id} className="me-3">
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <div className="error-message" errorMessageId={errorMessageId}>
        {errorMessage}
      </div>{" "}
    </div>
    <input
      {...register(id, rules)}
      type={type}
      className="form-control"
      id={id}
      defaultValue={value} // use the value prop as the defaultValue
    />
  </div>
);
