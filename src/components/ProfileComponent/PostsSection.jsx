// PostsSection.jsx
import React from "react";
import PostList from "./PostList";

const PostsSection = ({ posts }) => (
  <div className="col-lg-12 mb-4">
    <h5
      style={{
        fontWeight: "bold",
        color: "#009999",
        fontFamily: "'Roboto', sans-serif",
        marginBottom: "16px",
      }}
    >
      Posts
    </h5>
    <PostList posts={posts} />
  </div>
);

export default PostsSection;
