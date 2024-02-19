import "./App.css";
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { default as DynamicItem} from "./components/Routes/[item]";
import { default as Sidebar } from "./components/Sidebar";
import { SIDEBAR_DATA as dummyData  } from "./components/Data.js";

function App() {
  return (
    <div id="main">
      <Sidebar>
        <Routes>
          <Route path="/" element={<DynamicItem page="homepage" />} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<LazyLoadedComponent component={item.component} />} 
              />
            ))}
        </Routes>
      </Sidebar>
    </div>
  );
}

const LazyLoadedComponent = ({ component }) => {
  const Component = React.lazy(() => import(`./components/${component}`));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};
export default App;