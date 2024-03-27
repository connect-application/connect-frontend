import React from 'react';

  
const FollowerItem = ({ key,follower, handleFollowerClick }) => {
  const handleClick = () => {
    handleFollowerClick(follower);
  };

  return (
    
    <div  onClick={handleClick}><button color='red' type="button" class="btn btn-outline-info">
      {follower.firstName} {follower.lastName} ({follower.userName})
      </button> </div>
   
  );
};

export default FollowerItem;