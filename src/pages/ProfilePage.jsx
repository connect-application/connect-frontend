import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { SIDEBAR_DATA as dummyData } from "../components/Data"; // Move the import statement to the top
import Common from "../Common";
const ProfileCard = React.lazy(() =>
  import("../components/ProfileComponent/ProfileCard")
);

export const ProfilePage = () => {
  const { userId } = useParams();

  return (
    <Common dummyData={dummyData}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileCard userId={userId} />
      </Suspense>
    </Common>
  );
};
