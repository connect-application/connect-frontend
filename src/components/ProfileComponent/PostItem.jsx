// PostItem.jsx
import React from "react";

const postStyle = {
  borderBottom: "1px solid #e3e3e3",
  padding: "10px",
  textAlign: "left",
};

const postTextStyle = {
  color: "#009999",
  fontWeight: "bold",
  fontSize: "1rem",
};

const postDateStyle = {
  fontSize: "0.8rem",
  color: "#606770",
};

const PostItem = ({ post }) => (
  <div style={postStyle}>
    <h6 style={postTextStyle}>{post.postText}</h6>
    <p className="small mb-0" style={postDateStyle}>
      Created at: {new Date(post.createdAt).toLocaleString()}
    </p>
  </div>
);

export default PostItem;
