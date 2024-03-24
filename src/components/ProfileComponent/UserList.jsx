import React from "react";
import FollowerItem from "./FollowerItem";

const ListStyle = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e3e3e3",
  overflowY: "auto",
  height: "90px",
  fontSize: "0.9rem",
  color: "#606770",
  fontFamily: "'Roboto', sans-serif",
};

const UserList = ({ users, headerText }) => {
  return (
    <div className="col-lg-6 mb-4">
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
        {users.map((user, index) => (
          <FollowerItem key={index} follower={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
