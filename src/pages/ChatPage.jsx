import React, { Suspense, useState } from "react";
import { SIDEBAR_DATA as dummyData } from "../components/Data";
import Common from "../Common";
import ChatWindow from "../components/ChatComponent/ChatWindow";

const ChatCard = React.lazy(() =>
  import("../components/ChatComponent/ChatCard")
);


export const ChatPage = () => {
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
            <ChatCard userId={userId} handleFollowerClick={handleFollowerClick} />
          </Suspense>
        </Common>
      </div>

      {selectedFollower && ( // Render the chat window if a follower is selected

        <div className="col-lg-4 position-relative ">
          <ChatWindow
            selectedFollower={selectedFollower}
            onClose={closeChatWindow}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;