import React from "react";
import { Link } from "react-router-dom";

const ItemStyle = {
  borderBottom: "1px solid #e3e3e3",
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
};

// Component for each group item
const GroupItem = ({ group }) => {
  return (
    // <Link
    //   to={`/group/${group.groupId}`}
    //   style={{ textDecoration: "none", color: "#009999" }}
    // >
    <div style={ItemStyle}>
      <div>
        <strong>{group.groupName}</strong>
        <div>Category ID: {group.categoryId}</div>
      </div>
    </div>
    // </Link>
  );
};

export default GroupItem;
