import React, { Suspense, useState, useEffect } from "react";
import Common from "../../Common";
import { SIDEBAR_DATA as dummyData } from "../Data";
import axios from "axios";
import PostService from "../../services/PostService";
import GroupService from "../../services/GroupService";
import { useParams, Link } from "react-router-dom";
import UserList from "../ProfileComponent/UserList";
import Leaderboard from "./Leaderboard";
import PostCard from "../PostCard";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
      children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Groups() {
  const { groupId } = useParams();
  const [groupMembers, setGroupMembers] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState(null);
  const [leaderboardTimeType, setLeaderboardTimeType] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isInGroup, setIsInGroup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // State to track whether dialog is open or not
  const [currentUser, setCurrentUser] = useState(1);

  const handleToggleDialog = () => {
    setOpenDialog(!openDialog); // Toggle the state to open/close dialog
  };
  const handleCodeInputChange = (event) => {
    setGroupCode(event.target.value);
  };

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
    fetchData();
    getCurrentUser();
    console.log("inGroup ", isInGroup);
  }, [groupId, leaderboardType, leaderboardTimeType]);
  const fetchData = async () => {
    const groupUsers = await GroupService.getGroupUsers(groupId);
    try {
      setGroupMembers(groupUsers);
      fetchPosts(groupId);
      // console.log("groupposts: ", posts);
      if (leaderboardTimeType && leaderboardType) {
        fetchLeaderboard(groupId, leaderboardType, leaderboardTimeType);
      }
      const userGroups = await PostService.getUserGroups();
      const inGroup = userGroups.some(
        (group) => group.groupId === parseInt(groupId)
      );
      setIsInGroup(inGroup);
      // Check if the provided groupId exists in the user's groups
      const isInGroup = userGroups.some(
        (group) => group.groupId === parseInt(groupId)
      );
    } catch (error) {
      console.log(error);
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
  const joinGroup = () => {
    try {
      const joinData = GroupService.joinGroup(groupId, groupCode);
      fetchData();
    } catch (error) {
      alert("ERROR: Invalid code");
    }
  };

  // Define a function to handle exiting the group
  const exitGroup = () => {
    console.log("User is exiting the group...");
    try {
      const exitdata = GroupService.exitGroup(groupId);
      fetchData();
    } catch (error) {
      console.log("Error fetching leaderboard data:", error);
    }

    // Additional logic to exit the group can be added here
  };

  const handleDeletePost = (deletedPostId) => {
    setPosts(prevPostData => prevPostData.filter(item => item.postId !== deletedPostId));
  };
  const handleEditPost = (postId, editedText) => {
    // Make an API call to update the post text
    PostService.updatePost(postId, editedText)
      .then((response) => {
        if (response != null && response.data) {
          // If the post was successfully updated, you might want to update the UI or take other actions
          const updatedPosts = posts.map((post) =>
          post.postId === postId ? { ...post, postText: editedText } : post
        );
        setPosts(updatedPosts); 
        } else {
          console.error("Failed to update post.");
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };
  const getCurrentUser = () => {
    PostService.getCurrentUser()
      .then((response) => {
        if (response != null) {
          setCurrentUser(response.data.id);
          console.log("current user: " + response.data.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  return (
    <Common dummyData={dummyData}>
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8">
          <div>
            {/* Leaderboard Section */}
            <div>
              <h4
                style={{
                  fontWeight: "bold",
                  color: "#009999",
                  fontFamily: "'Roboto', sans-serif",
                  marginTop: "6px",
                }}
              >
                Leaderboard Options
              </h4>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#009999",
                }}
              >
                <select
                  value={leaderboardType}
                  style={{
                    fontWeight: "bold",
                    color: "#009999",
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: "6px",
                    marginLeft: "10px",
                  }}
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
                  style={{
                    fontWeight: "bold",
                    color: "#009999",
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: "6px",
                    marginLeft: "10px",
                  }}
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
              <h2
                style={{
                  fontWeight: "bold",
                  color: "#009999",
                  fontFamily: "'Roboto', sans-serif",
                  marginTop: "6px",
                  textAlign: "center",
                }}
              >
                Group Posts
              </h2>
              <ul>
                {posts.map((post, index) => (
                  <PostCard key={index} post={post}  onDeletePost={handleDeletePost} onEditPost={handleEditPost} currentUser={currentUser} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="col-md-4"
          style={{
            fontWeight: "bold",
            color: "#009999",
            fontFamily: "'Roboto', sans-serif",
            marginTop: "10px",
          }}
        >
          <div>
            <div>
              {isInGroup ? (
                <button onClick={exitGroup}  style={{ marginTop: '20px',marginLeft: '40px' }}  className="btn btn-show">
                  Exit Group
                </button>
              ) : (
                <div>
                  <button style={{ marginTop: '20px',marginLeft: '40px' }} onClick={handleToggleDialog} className="btn btn-show">
                    Join Group
                  </button>
                  <Dialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleToggleDialog} fullWidth>
                    <DialogTitle style={{ color: '#009999' }}>Enter Code</DialogTitle>
                    <DialogContent>            
                      {/* Add comment input */}
                      <TextField
                        label="Enter Secret Code"
                        value = {groupCode}
                        onChange={handleCodeInputChange}
                        variant="outlined"
                      />
                      <div>
                      <Button onClick={joinGroup} style={{ backgroundColor: '#009999', marginTop: '20px' }} variant="contained">
                        Submit
                      </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: '20px',marginRight: '10%' }} >
            <UserList users={groupMembers} headerText="Group Members" />
          </div>
        </div>
      </div>
    </Common>
  );
}

export default Groups;
