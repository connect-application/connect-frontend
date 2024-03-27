import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
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
import PostService from "../../services/postService";

const Posts = () => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL
  const [post, setPost] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile)); // Set the image URL
    } else {
      // Handle the case when no file is selected or when the selection is canceled
      setImageUrl(null); // Clear the image URL
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const createPost = async () => {
    try {
      var isPublic = false;
      if (visibility == "public") {
        isPublic = true;
      }
      console.log(localStorage.getItem("jwtToken"));
      const response = await PostService.createPost(caption, isPublic);
      setPost(response.data);
      console.log(response.data);
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
      <div id="colorPage">
        <Box
          component="form"
          className="post-form"
          sx={{
            overflowY: "auto",
            width: "60%",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 2,
          }}
          onSubmit={handleSubmit}
        >
          <h2>Create Post</h2>
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button
              sx={{
                display: "flex",
                marginTop: "10%",
                marginLeft: "15%",
                alignItems: "center",
                justifyContent: "center !important",
                width: "600px",
                height: "600px",
                border: "2px dashed #CCCCCC",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "border 0.3s ease",
                "&:hover": {
                  border: "2px dashed #AAAAAA",
                },
              }}
              component="div"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "fit" }}
                />
              ) : (
                <AddPhotoAlternateIcon
                  sx={{ fontSize: "48px", color: "#CCCCCC" }}
                />
              )}
            </Button>
          </label>
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
          </FormControl>
          <Button
            type="submit"
            size="large"
            variant="outlined"
            sx={{ mt: 2, marginLeft: "80%" }}
          >
            Post
          </Button>
        </Box>
      </div>
    </Common>
  );
};

export default Posts;
