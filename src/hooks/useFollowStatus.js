import { useState, useEffect } from 'react';
import {
  getFollowersList,
  toggleFollow,
} from "../services/userService";

export function useFollowStatus(userId, loggedInUserId) {
    const [isFollowing, setIsFollowing] = useState(false);
  
    useEffect(() => {
      const fetchFollowStatus = async () => {
        try {
          const followersUserData = await getFollowersList(userId);
          setIsFollowing(
            followersUserData.some(
              (follower) => Number(follower.id) === Number(loggedInUserId)
            )
          );
        } catch (error) {
          console.error("Failed to fetch follow status", error);
        }
      };
  
      fetchFollowStatus();
    }, [userId, loggedInUserId]);
  
    const handleFollowUnfollow = async () => {
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  
      try {
        await toggleFollow(userId);
      } catch (error) {
        console.error("Failed to toggle follow status", error);
        setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      }
    };
  
    return { isFollowing, handleFollowUnfollow };
  }