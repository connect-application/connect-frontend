import React from "react";
import { useUserProfile } from "../../hooks";
import UserList from "./UserList";

const ChatCard = ({handleFollowerClick }) => {
  const userId = localStorage.getItem("userId");
  const loggedInUserId = localStorage.getItem("userId");

  const {
    followersList,
    // followingsList,
    loading,
  } = useUserProfile(userId, loggedInUserId);

  if (loading) return <div>Loading...</div>;

  return (
    <UserList
      users={
        // followingsList
      followersList
      }
      headerText="Chats"
      handleFollowerClick={handleFollowerClick}
    />
  );
};

export default ChatCard;
