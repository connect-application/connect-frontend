import React from "react";
import LeaderboardItem from "./LeaderboardItem";

const ListStyle = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e3e3e3",
  overflowY: "auto",
  height: "90px",
  fontSize: "0.9rem",
  color: "#606770",
  fontFamily: "'Roboto', sans-serif",
};

const Leaderboard = ({ LeaderboardData, headerText }) => {
    
  return (
    <div className="col-lg-6 mb-4 scrollable">
      <h5
        style={{
          fontWeight: "bold",
          color: "#009999",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {headerText}
      </h5>
      <div style={ListStyle}>
        {LeaderboardData && LeaderboardData.map((entry) => (
          <LeaderboardItem entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
