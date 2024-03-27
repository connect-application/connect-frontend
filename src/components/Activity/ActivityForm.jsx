import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputField, SelectField } from "../common";
import axios from "axios";

export const ActivityForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue, // Import setValue from react-hook-form
    control, // Import control from react-hook-form
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const categories = [
    { value: 1, label: "Fitness" },
    { value: 2, label: "Education" },
    { value: 3, label: "Professional Goals" },
    { value: 4, label: "Daily Goal" },
  ];
  const onSubmit = async (data) => {
    try {
      // Check if time is provided for start and end time
      let startTime = data.startTime
        ? data.startDate + " " + data.startTime + ":00.000"
        : data.startDate + " 00:00:00.000";
      let endTime = data.endTime
        ? data.endDate + " " + data.endTime + ":00.000"
        : data.endDate + " 00:00:00.000";

      const activityData = {
        categoryId: data.category.value, // replace with actual data
        statusId: 1, // replace with actual data
        startTime: startTime,
        endTime: endTime,
        recurring: data.isRecurring,
        shared: data.visibility === "public",
        notified: false,
        postText: data.postText,
        // files: [], // Not needed here, as we're using FormData below
      };

      console.log(JSON.stringify(activityData, null, 2));

      // Make the request directly from here
      const token = localStorage.getItem("jwtToken"); // get the token from local storage

      const response = await axios.post(
        "http://localhost:8080/activity/addActivity",
        activityData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // use the token here
          },
        }
      );

      // Handle the response
      console.log(response.data);
      navigate("/create-activity/success");
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
      setValue("upload-photo", selectedFile); // Use setValue to set the value of the file input field
    } else {
      setImageUrl(null);
    }
  };

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

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
                Create Activity
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center mb-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "75px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Upload"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "24px" }}>+</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-lg-6">
                    <SelectField
                      control={control} // pass control from useForm
                      label="Category"
                      id="category"
                      rules={{ required: true }}
                      options={categories}
                      required
                      errorMessage={errors.category && "Required"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-lg-6">
                    <InputField
                      label="Start Date"
                      id="startDate"
                      register={register}
                      rules={{ required: true }}
                      type="date"
                      required
                      errorMessage={errors.startDate && "Required"}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <InputField
                      label="Start Time"
                      id="startTime"
                      register={register}
                      type="time"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-lg-6">
                    <InputField
                      label="End Date"
                      id="endDate"
                      register={register}
                      rules={{ required: true }}
                      type="date"
                      required
                      errorMessage={errors.endDate && "Required"}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <InputField
                      label="End Time"
                      id="endTime"
                      register={register}
                      type="time"
                    />
                  </div>
                </div>
                <div className="form-group form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isRecurring"
                    {...register("isRecurring")}
                  />
                  <label className="form-check-label" htmlFor="isRecurring">
                    Recurring Task
                  </label>
                </div>
                <InputField
                  label="Activity Description"
                  id="postText"
                  register={register}
                  rules={{ required: true }}
                  type="text"
                  required // Add this line
                  errorMessage={errors.postText && "Required"}
                />
                <h5 className="mb-3">Visibility</h5>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="visibility"
                      id="public"
                      value="public"
                      defaultChecked
                      {...register("visibility")}
                    />
                    <label className="form-check-label" htmlFor="public">
                      Public
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="visibility"
                      id="private"
                      value="private"
                      {...register("visibility")}
                    />
                    <label className="form-check-label" htmlFor="private">
                      Private
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#009999", color: "white" }}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
