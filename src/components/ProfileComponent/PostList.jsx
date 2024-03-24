// PostList.jsx
import React from "react";
import PostItem from "./PostItem";

const sectionStyle = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e3e3e3",
  overflowY: "auto",
  maxHeight: "250px",
  minHeight: "150px",
  fontFamily: "'Roboto', sans-serif",
  color: "#606770",
};

const PostList = ({ posts }) => (
  <div style={sectionStyle}>
    {posts.map((post, index) => (
      <PostItem key={index} post={post} />
    ))}
  </div>
);

export default PostList;
