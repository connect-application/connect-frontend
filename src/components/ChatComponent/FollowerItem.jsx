import React from 'react';


const ItemStyle = {
  borderBottom: "1px solid #e3e3e3",
  padding: "8px 12px",
};

  
const FollowerItem = ({ key,follower, handleFollowerClick }) => {
  const handleClick = () => {
    handleFollowerClick(follower);
  };

  return (
    <div style={ItemStyle} onClick={handleClick}>
      {follower.firstName} {follower.lastName} ({follower.userName})
    </div>
  );
};

export default FollowerItem;
