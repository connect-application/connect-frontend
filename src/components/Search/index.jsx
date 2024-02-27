import React, { Suspense } from 'react';
import Common from '../../Common';
import { SIDEBAR_DATA as dummyData } from '../Data';
  function Search() {
    return (
      <Common  dummyData={dummyData} > <div id="colorPage"></div></Common>
  );
}

export default Search;