import React from "react";
import { useForm } from "react-hook-form";

export const RecoverPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // handle form submission here
  };

  return (
    <form className="w-100 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Recovery Email</label>
        <input
          {...register("email", {
            validate: (value) =>
              value.length !== 0 ||
              "Please enter a recovery email." ||
              /\S+@\S+\.\S+/.test(value) ||
              "Please enter a valid email address.",
          })}
          type="email"
          className="form-control"
          id="email"
        />
        <div
          style={{
            height: "20px",
            color: errors.email ? "red" : "transparent",
          }}
        >
          {errors.email && errors.email.message}
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Send Code
      </button>
    </form>
  );
};
