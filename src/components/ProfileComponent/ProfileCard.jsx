import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile, useFollowStatus } from "../../hooks";
import ProfileHeader from "./ProfileHeader";
import AboutSection from "./AboutSection";
import PostsSection from "./PostsSection";
import FollowersAndFollowing from "./FollowersAndFollowing";

const ProfileCard = () => {
  const { userId } = useParams();
  const loggedInUserId = localStorage.getItem("userId");

  const {
    user,
    followers,
    following,
    followersList,
    followingsList,
    posts,
    postAttachments,
    loading,
  } = useUserProfile(userId, loggedInUserId);
  const { isFollowing, handleFollowUnfollow } = useFollowStatus(
    userId,
    loggedInUserId
  );

  const handleButtonClick = useCallback(() => {
    handleFollowUnfollow(userId);
  }, [handleFollowUnfollow, userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-5 h-100">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-9">
          <div
            className="card shadow-sm"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <ProfileHeader
              user={user}
              isFollowing={isFollowing}
              handleFollowUnfollow={handleButtonClick}
              userId={userId}
              loggedInUserId={loggedInUserId}
              followers={followers}
              following={following}
            />
            <AboutSection
              aboutText={
                user.about || "User has not provided an about section."
              }
            />
            <div className="row px-3">
              <FollowersAndFollowing
                followers={followersList}
                following={followingsList}
              />
            </div>
            <PostsSection posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
