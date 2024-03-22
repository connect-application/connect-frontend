import React from "react";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../assets/img/logos/base.png";

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
        {follower.profilePic ? (
          <img
            src={`data:image/jpeg;base64,${follower.profilePic}`}
            alt={`${follower.userName}'s avatar`}
            className="rounded-circle"
            style={{
              width: "30px",
              height: "30px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
        ) : (
          <img
            src={defaultProfilePic}
            alt={`${follower.userName}'s avatar`}
            className="rounded-circle"
            style={{
              width: "30px",
              height: "30px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
        )}
        {follower.userName}
      </div>
    </Link>
  );
};

export default FollowerItem;
