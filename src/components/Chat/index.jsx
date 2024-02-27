import React, { Suspense } from 'react';
import Common from '../../Common';
import { SIDEBAR_DATA as dummyData } from '../Data';
  function Chat() {
    return (
      <Common  dummyData={dummyData} > <div id="colorPage"></div></Common>
  );
}

export default Chat;