import React from "react";
import { useParams } from "react-router-dom";
import { ProfileEditCard } from "../components/ProfileComponent/ProfileEditCard";
import Common from "../Common";
import { SIDEBAR_DATA as dummyData } from "../components/Data";

export const ProfileEditPage = () => {
  const { userId } = useParams();

  return (
    <Common dummyData={dummyData}>
      <ProfileEditCard userId={userId} />
    </Common>
  );
};
