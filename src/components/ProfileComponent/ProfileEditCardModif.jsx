import React, { useState, useEffect, useRef } from "react";
import { getUser } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputField } from "../common";

export const ProfileEditCardModif = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // initialize useNavigate
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    dateOfBirth: "",
    aboutSection: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // set the default values here
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
    },
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(userId);
      if (userData) {
        setUser(userData);
        setProfilePictureUrl(userData.profilePicture);
        reset({
          // reset the form with the fetched user data
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.userName,
          dateOfBirth: userData.dateOfBirth,
          email: userData.email,
        });
      }
    };

    fetchData();
  }, [userId, reset]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newProfilePictureUrl = URL.createObjectURL(file);
      setProfilePictureUrl(newProfilePictureUrl);
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: file,
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  const onSubmit = async (data) => {
    // Process the form submission here
    navigate(`/profile/${userId}`);
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
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center mb-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      cursor: "pointer",
                      marginBottom: "10px",
                      position: "relative",
                      display: "inline-block",
                    }}
                    onClick={triggerFileInput}
                  >
                    {profilePictureUrl ? (
                      <img
                        src={profilePictureUrl}
                        alt="Profile"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                        }}
                      >
                        +
                      </div>
                    )}
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-3">
                  <label htmlFor="aboutSection" className="form-label">
                    About
                  </label>

                  <textarea
                    id="aboutSection"
                    name="aboutSection"
                    rows="4"
                    className="form-control"
                    value={user.aboutSection}
                  ></textarea>
                </div>

                {/* User Information */}
                <InputField
                  label="First Name"
                  id="firstName"
                  register={register}
                  value={user.firstName}
                  rules={{ required: "First name is required" }}
                  errorMessage={errors.firstName && errors.firstName.message}
                />
                <InputField
                  label="Last Name"
                  id="lastName"
                  register={register}
                  value={user.lastName}
                  rules={{ required: "Last name is required" }}
                  errorMessage={errors.lastName && errors.lastName.message}
                />
                <InputField
                  label="Username"
                  id="username"
                  register={register}
                  value={user.userName}
                  rules={{ required: "Username is required" }}
                  errorMessage={errors.username && errors.username.message}
                />

                <InputField
                  label="Date of Birth"
                  id="dateOfBirth"
                  register={register}
                  rules={{ required: "* Date of birth is required" }}
                  type="date"
                  value={user.dateOfBirth}
                  errorMessage={
                    errors.dateOfBirth && errors.dateOfBirth.message
                  }
                />
                {/* Contact Section */}
                <InputField
                  label="Email"
                  id="email"
                  register={register}
                  value={user.email}
                  rules={{
                    required: "* Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "* Invalid email address",
                    },
                  }}
                  type="email"
                  errorMessage={errors.email && errors.email.message}
                />

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#009999", color: "white" }}
                  >
                    Update Profile
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
