import React, { Suspense, useState, useEffect } from "react";
import Common from "../../Common";
import { SIDEBAR_DATA as dummyData } from "../Data";
import axios from "axios";
import PostService from "../../services/PostService";
import GroupService from "../../services/GroupService";

function Groups() {
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState(null);
  const [leaderboardTimeType, setLeaderboardTimeType] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [posts, setPosts] = useState([]);

  // Define leaderboard type options
  const leaderboardTypeOptions = [
    { value: 1, label: "Activities Completed" },
    { value: 2, label: "Activities In Progress" },
  ];
  const leaderboardTimeTypeOptions = [
    { value: 0, label: "Daily" },
    { value: 1, label: "Weekly" },
    { value: 2, label: "Monthly" },
    { value: 3, label: "Yearly" },
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await PostService.getUserGroups();

        setGroupOptions(
          groups.map((group) => ({
            value: group.groupId,
            label: group.groupName,
          }))
        );
      } catch (error) {
        console.log("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupChange = async (e) => {
    const selectedGroupId = parseInt(e.target.value, 10);
    setSelectedGroup(selectedGroupId);
    const selectedGroupObject = groupOptions.find(
      (group) => group.value === selectedGroupId
    );
    if (selectedGroupObject) {
      setSelectedGroupName(selectedGroupObject.label);
      fetchPosts(selectedGroupId);
      console.log("groupposts: ", posts);
      try {
        const groupUsers = await GroupService.getGroupUsers(selectedGroupId);
        setGroupMembers(groupUsers);
        if (leaderboardTimeType && leaderboardType) {
          fetchLeaderboard(
            selectedGroupId,
            leaderboardType,
            leaderboardTimeType
          );
        }
      } catch (error) {
        console.log("Error fetching group members:", error);
      }
    } else {
      setSelectedGroupName("");
      setGroupMembers([]);
      setLeaderboardData([]);
    }
  };

  const fetchLeaderboard = async (groupId, type, timeType) => {
    try {
      const leaderboard = await GroupService.getGroupLeaderboard(
        groupId,
        type,
        timeType
      );
      setLeaderboardData(leaderboard);
    } catch (error) {
      console.log("Error fetching leaderboard data:", error);
    }
  };

  const fetchPosts = async (groupId) => {
    try {
      const postData = await PostService.getGroupPosts(groupId);
      setPosts(postData);
    } catch (error) {
      console.log("Error fetching leaderboard data:", error);
    }
  };

  const handleLeaderboardTypeChange = (e) => {
    setLeaderboardType(e.target.value);
    if (leaderboardTimeType) {
      fetchLeaderboard(selectedGroup, e.target.value, leaderboardTimeType);
    }
  };

  const handleLeaderboardTimeTypeChange = (e) => {
    setLeaderboardTimeType(e.target.value);
    // Fetch leaderboard data when leaderboard time type is selected
    if (leaderboardType) {
      fetchLeaderboard(selectedGroup, leaderboardType, e.target.value);
    }
  };

  return (
    <Common dummyData={dummyData}>
      <div>
        <select
          value={selectedGroup}
          onChange={handleGroupChange}
          displayEmpty
          fullWidth
        >
          <option value="">Select a group</option>
          {groupOptions.map((group) => (
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          ))}
        </select>

        {selectedGroup && (
          <div>
            <h2>
              Group ID: {selectedGroup}, Group Name: {selectedGroupName}
            </h2>
            <div>
              <h3>Group Members:</h3>
              <ul>
                {groupMembers.map((member) => (
                  <li key={member.id}>
                    User ID: {member.id}, Username: {member.username}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3>Group Posts:</h3>
              <ul>
                {posts.map((post) => (
                  <li key={post.postId}>
                    <p>Post ID: {post.postId}</p>
                    <p>User ID: {post.userId}</p>
                    <p>Post Text: {post.postText}</p>
                    <p>Created At: {post.createdAt}</p>
                    <p>Is Public: {post.isPublic ? "Yes" : "No"}</p>
                    <p>No of Likes: {post.noOfLikes}</p>
                    <p>Liked: {post.liked ? "Yes" : "No"}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Leaderboard</h3>
              <div>
                <select
                  value={leaderboardType}
                  onChange={handleLeaderboardTypeChange}
                >
                  <option value="">Select leaderboard type</option>
                  {leaderboardTypeOptions.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <select
                  value={leaderboardTimeType}
                  onChange={handleLeaderboardTimeTypeChange}
                >
                  <option value="">Select time type</option>
                  {leaderboardTimeTypeOptions.map((timeType) => (
                    <option key={timeType.value} value={timeType.value}>
                      {timeType.label}
                    </option>
                  ))}
                </select>
              </div>
              <ul>
                {leaderboardData.map((entry) => (
                  <li key={entry.user.id}>
                    User ID: {entry.user.id}, Name: {entry.user.firstName}{" "}
                    {entry.user.lastName}, Activities in Progress:{" "}
                    {entry.activitiesInProgress}, Activities Finished:{" "}
                    {entry.activitiesFinished}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Common>
  );
}

export default Groups;
