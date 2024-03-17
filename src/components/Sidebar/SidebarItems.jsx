import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { SIDEBAR_DATA as dummyData } from "../Data";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
  SubmenuItem,
} from "../Sidebar/SidebarStyles";

import { CreateIcon } from "../Icons";

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const userId = localStorage.getItem("userId"); // get the user ID from the localStorage

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };
  const handleItemClick = (itemName) => {
    if (itemName === "create") {
      toggleSubmenu();
      setActiveItem(null); // Clear active item when "Create" is clicked
    } else {
      setActiveItem(itemName);
      setShowSubmenu(false); // Collapse submenu when other items are clicked
    }
  };

  return (
    <ItemsList>
      {dummyData.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => handleItemClick(itemData.name)}
          className={
            itemData.name === "create" || activeItem === itemData.id
              ? "active"
              : ""
          }
        >
          <Link
            to={
              itemData.path === "/profile"
                ? `${itemData.path}/${userId}`
                : itemData.path
            }
          >
            <ItemWrapper>
              {itemData.icon}
              <ItemName displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
          {itemData.name === "create" && showSubmenu && (
            <div className="submenu">
              <SubmenuItem>
                <Link to="/create-post">
                  <ItemWrapper>
                    <CreateIcon />
                    <ItemName displaySidebar={displaySidebar}>Post</ItemName>
                  </ItemWrapper>
                </Link>
              </SubmenuItem>
              <SubmenuItem>
                <Link to="/create-activity">
                  <ItemWrapper>
                    <CreateIcon />
                    <ItemName displaySidebar={displaySidebar}>
                      Activity
                    </ItemName>
                  </ItemWrapper>
                </Link>
              </SubmenuItem>
            </div>
          )}
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;
