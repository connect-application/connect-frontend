import { useState, useEffect } from 'react';
import {
  getUser,
  getFollowersCount,
  getFollowingCount,
  getFollowersList,
  getFollowingsList,
} from "../services/userService";
import { getUserPosts, getCurrentUserPosts , getPostAttachments} from "../services/PostService";


export function useUserProfile(userId, loggedInUserId) {
  const [profileData, setProfileData] = useState({
    user: {},
    followers: 0,
    following: 0,
    followersList: [],
    followingsList: [],
    posts: [],
    postAttachments: [],
    loading: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(userId);
      console.log(userData); // Add this line
      setProfileData(prevData => ({ ...prevData, user: userData }));
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const followersCount = await getFollowersCount(userId);
      const followersUserData = await getFollowersList(userId);
      setProfileData(prevData => ({ ...prevData, followers: followersCount, followersList: followersUserData }));
    };

    fetchFollowers();
  }, [userId]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const followingCount = await getFollowingCount(userId);
      const followingsUserData = await getFollowingsList(userId);
      setProfileData(prevData => ({ ...prevData, following: followingCount, followingsList: followingsUserData }));
    };

    fetchFollowing();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      let postsData;
      if (userId === loggedInUserId) {
        postsData = await getCurrentUserPosts();
        console.log('logged User:', postsData);
      } else {
        postsData = await getUserPosts(userId);
        console.log('Not logged User:', postsData);
      }
      // Fetch the attachments for each post and include them in the post objects
      let postsWithAttachments = [];
      for (let post of postsData) {
        console.log(post); // Add this line
        const attachments = await getPostAttachments(post.postId);
        postsWithAttachments.push({ ...post, attachments });
      }
      postsWithAttachments = postsWithAttachments.reverse();


    setProfileData(prevData => ({ ...prevData, posts: postsWithAttachments, loading: false }));
  };

    fetchPosts();
  }, [userId, loggedInUserId]);



  return profileData;
}