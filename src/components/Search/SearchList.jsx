import React, { useEffect, useState } from "react";
import { searchUser, searchGroup } from "../../services/userService";
import UserItem from "./UserItem";
import GroupItem from "./GroupItem";

const ListStyle = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e3e3e3",
  overflowY: "auto",
  height: "350px",
  fontSize: "0.9rem",
  color: "#606770",
  fontFamily: "'Roboto', sans-serif",
};

// Adjust the searchUser and add a similar searchGroup function if needed

const SearchList = ({ headerText, displayGroups, query }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        let response = [];
        try {
          if (displayGroups === "groups") {
            console.log("Group Request");
            response = await searchGroup(query);
          } else if (displayGroups === "users") {
            console.log("User Request");
            response = await searchUser(query);
          }
          setData(response); // Assuming response is directly usable
        } catch (error) {
          console.error("Failed to fetch:", error);
          setData([]); // Reset or handle error
        }
      } else {
        setData([]); // Reset data when there's no query
      }
    };

    fetchData();
  }, [displayGroups, query]);

  return (
    <div className="col-lg-8 mb-8" style={{ marginTop: "30px" }}>
      <h5
        style={{
          fontWeight: "bold",
          color: "#009999",
          fontFamily: "'Roboto', sans-serif",
          textAlign: "center",
        }}
      >
        {headerText}
      </h5>
      <div style={ListStyle}>
        {data.length > 0 ? (
          data.map((item) =>
            displayGroups === "groups" ? (
              <GroupItem key={item.groupId} group={item} />
            ) : (
              <UserItem key={item.id} user={item} />
            )
          )
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchList;
