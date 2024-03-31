import React, { useState,useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Radio,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SIDEBAR_DATA as dummyData } from "../Data";
import Common from "../../Common";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import PostService from "../../services/PostService";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isGroup, setisGroup] = useState("No");
  const [files, setFile] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [imageUrl, setImageUrls] = useState(null); // State to store the image URL
  const [post, setPost] = useState(null);
  const [groupOptions, setGroupOptions] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await PostService.getUserGroups();
        console.log(groups);
        setGroupOptions(groups.map(group => ({
          value: group.groupId,
          label: group.groupName
        })));
      } catch (error) {
        console.log("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImageUrls(fileUrls);
    setFile(selectedFiles);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };
  const fileInputRef = useRef(null);
  useEffect(() => {
    register("files"); // Register the files field
  }, [register]);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleisGroupChange = (e) => {
    setisGroup(e.target.value);
    setSelectedGroup("");
  };
  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const createPost = async () => {
    try {
      var isPublic = false;
      if (visibility == "public") {
        isPublic = true;
      }
      var isGroupPost = false;
      if(isGroup == "Yes"){
        isGroupPost=true;
      }
      const formData = new FormData();
      formData.append("postText", caption);
      formData.append("isPublic", isPublic);
      formData.append("isGroupPost", isGroupPost);
      formData.append("groupId", selectedGroup);

      if (files && files.length > 0) {
        files.forEach((file, index) => {
          formData.append("files", file);
        });
      }
      console.log("FormData img:", formData.getAll("files").length);
      console.log("formdata ispub", formData.get("isPublic"));
      console.log("formdata isGroupPost", formData.get("isGroupPost"));
      console.log("formdata postText", formData.get("postText"));
      console.log("formdata groupId", formData.get("groupId"));

      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${API_URL}/posts/addPost`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // use the token here
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const response = await PostService.createPost(caption, isPublic, isGroup, selectedGroup);
      setPost(response.data);
      console.log(response.data);
      navigate("/create-post/success");
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    createPost();
  };

  return (
    <Common dummyData={dummyData}>
          <div className="container py-5"  style={{ position: "absolute"}}>
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
                Create Post
              </h2>
              <form onSubmit={handleSubmit} >
              <div className="text-center mb-4">
                  <input
                    id="upload-photo"
                    name="upload-photo"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
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
                    onClick={triggerFileInput}
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
                <TextField
                  id="outlined-multiline-flexible"
                  size="large"
                  label="Caption"
                  multiline
                  maxRows={4}
                  fullWidth
                  value={caption}
                  onChange={handleCaptionChange}
                  sx={{ mt: 2 }}
                />
                <div>
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Visibility</FormLabel>
                  <RadioGroup
                    row
                    name="visibility"
                    value={visibility}
                    onChange={handleVisibilityChange}
                  >
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label="Public"
                    />
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label="Private"
                    />
                  </RadioGroup>
                  {/* Is Group */}
                  <FormLabel component="legend">Is For Group</FormLabel>
                  <RadioGroup
                    row
                    name="isGroup"
                    value={isGroup}
                    onChange={handleisGroupChange}
                  >
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                  </RadioGroup>
                  {isGroup === "Yes" && (
                    <FormControl sx={{ mt: 2 }} fullWidth>
                      <Select
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>
                          Select Group
                        </MenuItem>
                        {/* Populate with your group options */}
                        {groupOptions.map((group) => (
                          <MenuItem key={group.value} value={group.value}>
                            {group.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </FormControl>
                </div>
                <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#009999", color: "white" ,alignItems: "center" }}
                  >
                    Create
                  </button>
              </form>
            </div>
            </div>
            </div>
            </div>
        </div>

    </Common>
  );
};

export default Posts;
