import "./App.css";
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
                element={<DynamicItem page={item.name} />}
              />
            ))}
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;