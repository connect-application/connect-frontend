import React from "react";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../assets/img/logos/base.png";

const ItemStyle = {
  borderBottom: "1px solid #e3e3e3",
  padding: "8px 12px",
};

// Subcomponent for each follower item
const LeaderboardItem = ({ entry }) => {
  return (
    <Link
      to={`/profile/${entry.user.id}`}
      style={{ color: "#009999", textDecoration: "none" }}
    >
      <div style={ItemStyle}>
        {entry.user.username} Activities Finished: {entry.activitiesFinished} Activities In Progress: {entry.activitiesInProgress}
      </div>
    </Link>
  );
};

export default LeaderboardItem;
