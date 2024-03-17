import React from "react";
import { ActivityForm } from "../components/Activity";
import Common from "../Common";
import { SIDEBAR_DATA as dummyData } from "../components/Data";

export const NewActivityPage = () => {
  return (
    <Common dummyData={dummyData}>
      <ActivityForm />
    </Common>
  );
};
