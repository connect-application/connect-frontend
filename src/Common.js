import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { default as Sidebar } from "./components/Sidebar";
import { SIDEBAR_DATA as dummyData } from './components/Data.js';

function Common ({ children }) {
    return (
        <div id="colorPage">
            <Sidebar>
                {children}
            <Routes>
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
        <React.Suspense fallback={<div>Loading...</div>}>
            <Component />
        </React.Suspense>
    );
};

export default Common;