import React, { Suspense, useState, useEffect } from "react";
import Common from "../../Common";
import { SIDEBAR_DATA as dummyData } from "../Data";
import axios from "axios";
import PostService from "../../services/PostService";
import GroupService from "../../services/GroupService";
import { useParams } from "react-router-dom";
import UserList from "../ProfileComponent/UserList";
import Leaderboard from "./Leaderboard";

function Groups() {
  const { groupId } = useParams();

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
    const fetchData = async () => {
      const groupUsers = await GroupService.getGroupUsers(groupId);
      try {
        setGroupMembers(groupUsers);
        fetchPosts(groupId);
        // console.log("groupposts: ", posts);
        if (leaderboardTimeType && leaderboardType) {
          fetchLeaderboard(groupId, leaderboardType, leaderboardTimeType);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [groupId, leaderboardType, leaderboardTimeType]);

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
      fetchLeaderboard(groupId, e.target.value, leaderboardTimeType);
    }
  };

  const handleLeaderboardTimeTypeChange = (e) => {
    setLeaderboardTimeType(e.target.value);
    // Fetch leaderboard data when leaderboard time type is selected
    if (leaderboardType) {
      fetchLeaderboard(groupId, leaderboardType, e.target.value);
    }
  };

  return (
    <Common dummyData={dummyData}>
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8">
          <div className="scrollable">
            {/* Leaderboard Section */}
            <div>
              <h5
                style={{
                  fontWeight: "bold",
                  color: "#009999",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Leaderboard Options
              </h5>
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

                <Leaderboard
                  LeaderboardData={leaderboardData}
                  headerText="Group Leaderboard"
                />
              </div>
            </div>

            {/* Group Posts Section */}
            <div>
              <h3>Group Posts</h3>
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
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-4">
          <div className="scrollable">
            <UserList users={groupMembers} headerText="Group Members" />
          </div>
        </div>
      </div>
    </Common>
  );
}

export default Groups;
