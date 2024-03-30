import React from "react";
import { Link } from "react-router-dom";
import Common from "../Common";
import { SIDEBAR_DATA as dummyData } from "../components/Data";

export const NewPostSuccessPage = () => (
  <Common dummyData={dummyData}>
    {/* Extend the container to use the full viewport height for centering */}
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="text-center"
        style={{ maxWidth: "600px", padding: "0 20px" }}
      >
        {" "}
        {/* Adjust maxWidth for optimal readability */}
        <h2>Post Creation Success</h2>
        <p>Your new post was generated successfully!</p>
        <p className="mt-3">
          Generate another <Link to="/create-post">post</Link>.
        </p>
      </div>
    </div>
  </Common>
);
