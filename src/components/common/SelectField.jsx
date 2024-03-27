import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export const SelectField = ({
  control, // add this prop
  label,
  id,
  rules,
  options,
  errorMessage,
  required = false,
}) => (
  <div className="form-group">
    <div className="d-flex">
      <label htmlFor={id} className="me-3">
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <div className="error-message">{errorMessage}</div>
    </div>
    <Controller
      control={control} // pass control prop here
      name={id}
      rules={rules}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          className="form-control"
          id={id}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "1px solid #ced4da", // Remove the border here
            }),
          }}
        />
      )}
    />
  </div>
);
