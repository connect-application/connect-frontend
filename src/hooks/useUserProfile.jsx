import { useState, useEffect } from "react";
import {
  getUser,
  getFollowersCount,
  getFollowingCount,
  getFollowersList,
  getFollowingsList,
} from "../services/userService";
import { getUserPosts, getCurrentUserPosts } from "../services/PostService";

export function useUserProfile(userId, loggedInUserId) {
  const [profileData, setProfileData] = useState({
    user: {},
    followers: 0,
    following: 0,
    followersList: [],
    followingsList: [],
    posts: [],
    loading: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(userId);
      setProfileData((prevData) => ({ ...prevData, user: userData }));
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const followersCount = await getFollowersCount(userId);
      const followersUserData = await getFollowersList(userId);
      setProfileData((prevData) => ({
        ...prevData,
        followers: followersCount,
        followersList: followersUserData,
      }));
    };

    fetchFollowers();
  }, [userId]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const followingCount = await getFollowingCount(userId);
      const followingsUserData = await getFollowingsList(userId);
      setProfileData((prevData) => ({
        ...prevData,
        following: followingCount,
        followingsList: followingsUserData,
      }));
    };

    fetchFollowing();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      let postsData;
      if (userId === loggedInUserId) {
        postsData = await getCurrentUserPosts();
        console.log("not logged User:", postsData);
      } else {
        postsData = await getUserPosts(userId);
        console.log("logged User:", postsData);
      }
      setProfileData((prevData) => ({
        ...prevData,
        posts: postsData,
        loading: false,
      }));
    };

    fetchPosts();
  }, [userId, loggedInUserId]);

  return profileData;
}
