import React, { Suspense, useState } from "react";
import { SIDEBAR_DATA as dummyData } from "../components/Data";
import Common from "../Common";

const GroupCard = React.lazy(() =>
  import("../components/Groups/GroupCard")
);


export const GroupPage = () => {
  const userId = localStorage.getItem("userId");
  const [selectedFollower, setSelectedFollower] = useState(null); // State to manage selected follower

  const handleFollowerClick = (follower) => {
    setSelectedFollower(follower);

  };

  const closeChatWindow = () => {
    setSelectedFollower(null);
  };

  return (
    <div className="row no-gutters ">
      <div className="col-lg-8 align-items-center">
        <Common dummyData={dummyData}>
          <Suspense fallback={<div>Loading...</div>}>
            <GroupCard userId={userId} handleFollowerClick={handleFollowerClick} />
          </Suspense>
        </Common>
      </div>
    </div>
  );
};

export default GroupPage;