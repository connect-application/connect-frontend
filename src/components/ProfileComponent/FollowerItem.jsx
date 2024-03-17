import React from "react";
import { Link } from "react-router-dom";

const ItemStyle = {
  borderBottom: "1px solid #e3e3e3",
  padding: "8px 12px",
};

// Subcomponent for each follower item
const FollowerItem = ({ follower }) => {
  return (
    <Link
      to={`/profile/${follower.id}`}
      style={{ color: "#009999", textDecoration: "none" }}
    >
      <div style={ItemStyle}>
        {/* Placeholder for future image */}
        {/* <img src={follower.image} alt={follower.userName} style={{ width: 30, height: 30, borderRadius: '50%' }} /> */}
        {follower.userName}
        {/* Placeholder for additional information like name, etc. */}
      </div>
    </Link>
  );
};

export default FollowerItem;
