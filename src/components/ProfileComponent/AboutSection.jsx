import React from "react";

const AboutSection = ({ aboutText }) => {
  return (
    <div className="mb-5" style={{ margin: "15px" }}>
      <h2
        className="mb-3"
        style={{
          fontWeight: "bold",
          color: "#009999",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        About
      </h2>
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #e3e3e3",
          color: "#606770",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "1rem",
          overflowY: "auto",
          height: "100px",
        }}
      >
        <p className="mb-0" style={{ fontStyle: "italic" }}>
          {aboutText}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
