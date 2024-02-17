import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIDEBAR_DATA as dummyData } from "../Data";
import {
    ItemsList,
    ItemContainer,
    ItemWrapper,
    ItemName,
} from "../Sidebar/SidebarStyles";

const SidebarItems = ({ displaySidebar }) => {
const [activeItem, setActiveItem] = useState(0);

return (
        <ItemsList>
        {dummyData.map((itemData, index) => (
            <ItemContainer
            key={index}
            onClick={() => setActiveItem(itemData.id)}
            className={itemData.id === activeItem ? "active" : ""}
            >
            <Link to={itemData.path}>
                <ItemWrapper>
                {itemData.icon}
                <ItemName displaySidebar={displaySidebar}>
                    {itemData.name}
                </ItemName>
                </ItemWrapper>
            </Link>
            </ItemContainer>
        ))}
        </ItemsList>
    );
    };

    export default SidebarItems;