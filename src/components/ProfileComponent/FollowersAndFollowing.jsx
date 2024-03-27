import React from "react";
import UserList from "./UserList";

const FollowersAndFollowing = ({ followers, following }) => {
  return (
    <>
      <UserList users={followers} headerText="Followers" />
      <UserList users={following} headerText="Following" />
    </>
  );
};
export default FollowersAndFollowing;
