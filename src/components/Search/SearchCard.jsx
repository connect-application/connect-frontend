import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../common";
import SearchList from "./SearchList";
import {Select, MenuItem, TextField} from "@mui/material";
export const SearchCard = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [queryText, setQueryText] = useState("");
  const [queryType, setQueryType] = useState("");

  const onSubmit = async (data) => {
    setQueryText(data.query);
    setQueryType(queryType);
  };

  const searchOptions = [
    { value: "users", label: "Users" },
    { value: "groups", label: "Groups" },
  ];
  const handleTypeChange = (event) => {
    // Reset queryText when the type changes
    setQueryText('');
    setQueryType(event.target.value); // Update queryType with the selected value
  };

  const handleQueryTextChange = (event) => {
    setQueryText(event.target.value);
  }

  return (
    <div className="container py-5">
      <div className="row"  style={{ overflowX: "hidden" }}>
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
                    <Select
                      value={queryType}
                      onChange={handleTypeChange}
                      displayEmpty
                      fullWidth
                    >
                    <MenuItem value="" disabled>
                          Select Type
                        </MenuItem>
                        {/* Populate with your group options */}
                        {searchOptions.map((searchOption) => (
                          <MenuItem key={searchOption.value} value={searchOption.value}>
                            {searchOption.label}
                          </MenuItem>
                        ))}
                  </Select>
                  </div>
                </div>
                 <TextField
                  id="outlined-multiline-flexible"
                  size="large"
                  label="Query"
                  multiline
                  maxRows={4}
                  fullWidth
                  value={queryText}
                  onChange={handleQueryTextChange}
                  sx={{ mt: 2 }}
                />
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
