import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../common";
import SearchList from "./SearchList";

export const SearchCard = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setQueryText(data.query);
    setQueryType(data.type.value);
  };

  const [queryText, setQueryText] = useState("");
  const [queryType, setQueryType] = useState("");

  const searchOptions = [
    { value: "users", label: "Users" },
    { value: "groups", label: "Groups" },
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            className="card shadow-sm"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <div className="card-body">
              <h2
                className="card-title text-center mb-4"
                style={{ color: "#009999" }}
              >
                Search
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="col-12 col-lg-6">
                    <SelectField
                      control={control}
                      label="Type"
                      id="type"
                      rules={{ required: true }}
                      options={searchOptions}
                      errorMessage={errors.type && "Type is required"}
                      required
                      {...register("type")}
                    />
                  </div>
                </div>
                <InputField
                  label="Query"
                  id="query"
                  register={register}
                  type="text"
                  {...register("query")}
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#009999", color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                <SearchList
                  headerText={"Results"}
                  displayGroups={queryType}
                  query={queryText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
