import React from "react";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../assets/img/logos/base.png"; // Ensure this path is correct

const ItemStyle = {
  borderBottom: "1px solid #e3e3e3",
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
};

// Component for each user item
const UserItem = ({ user }) => {
  return (
    <Link to={`/profile/${user.id}`}>
      <div style={ItemStyle}>
      {user.profilePic ? (
              <img
                src={`data:image/jpeg;base64,${user.profilePic}`}
                alt={`${user.userName}'s avatar`}
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
                alt={`${user.userName}'s avatar`}
                className="rounded-circle"
                style={{
                  width: "30px",
                  height: "30px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
            )}
        <div style={{ color: "#009999" }}>
          <strong>{user.username}</strong>{" "}
          <div>{`${user.firstName} ${user.lastName}`}</div>
        </div>
      </div>
    </Link>
  );
};

export default UserItem;
