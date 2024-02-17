import React, { useState } from "react";
import BrandLogo from '../images/logo2.png';
import {
    Children,
    SidebarContainer,
    SidebarWrapper,
    SidebarLogoWrapper,
    SidebarLogo,
    SidebarBrand,
    SidebarToggler,
} from "./SidebarStyles";
import { SidebarItems } from "../..";
const MOBILE_VIEW = window.innerWidth < 468;
    export default function Sidebar({ children }) {
        const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);
    
        const handleSidebarDisplay = (e) => {
        e.preventDefault();
        if (window.innerWidth > 468) {
            setDisplaySidebar(!displaySidebar);
        } else {
            setDisplaySidebar(false);
        }
        };
    
        return (
        <React.Fragment>
            <SidebarContainer displaySidebar={displaySidebar}>
            <SidebarWrapper>
                <SidebarLogoWrapper displaySidebar={displaySidebar}>
                {/* Logo wrapper starts */}
                <SidebarLogo href="#">
                <img src={BrandLogo} alt="Brand logo" />
                </SidebarLogo>
                {/* Logo wrapper ends */}
                </SidebarLogoWrapper>
                {/* Render the SidebarItems component */}
                <SidebarItems displaySidebar={displaySidebar} />
            </SidebarWrapper>
            </SidebarContainer>
                {/* Render the children */}
            <Children displaySidebar={displaySidebar}>{children}</Children>
        </React.Fragment>
        );
    }
