import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { SIDEBAR_DATA as dummyData } from "../components/Data";
import Common from "../Common";
import ChatWindow from "../components/ChatComponent/ChatWindow"; // Import the ChatWindow component

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
    <div className="row no-gutters align-items-center">
      <div className="col-lg-8">
        <Common dummyData={dummyData}>
          <Suspense fallback={<div>Loading...</div>}>
            <ChatCard userId={userId} handleFollowerClick =  {handleFollowerClick}/>
          </Suspense>
        </Common>
      </div>
      
      {selectedFollower && ( // Render the chat window if a follower is selected
      
        <div className="row no-gutters align-items-center col-lg-3">
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
