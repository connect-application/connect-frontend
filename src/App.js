import "./App.css";
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { default as DynamicItem} from "./components/Routes/[item]";
import Common from "./Common";
import { SIDEBAR_DATA as dummyData  } from "./components/Data.js";
import { Layout } from "lucide-react";

  function Home() {
    return (
      <Common  dummyData={dummyData} > <div id="colorPage"></div></Common>
  );
}

export default Home;