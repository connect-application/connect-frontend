import React from "react";
import { useParams } from "react-router-dom";
import { SearchCard } from "../components/Search/SearchCard";
import Common from "../Common";
import { SIDEBAR_DATA as dummyData } from "../components/Data";

export const SearchPage = () => {
  const { userId } = useParams();

  return (
    <Common dummyData={dummyData}>
      <SearchCard userId={userId} />
    </Common>
  );
};
