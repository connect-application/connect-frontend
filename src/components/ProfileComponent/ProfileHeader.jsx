import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  user,
  isFollowing,
  handleFollowUnfollow,
  userId,
  loggedInUserId,
  followers,
  following,
}) => {
  return (
    <div
      className="card-header d-flex justify-content-between align-items-center p-4"
      style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e3e3e3" }}
    >
      <div className="d-flex align-items-center flex-grow-1">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
          alt={`${user.userName}'s avatar`}
          className="rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div className="ms-3">
          <h2
            className="mb-0"
            style={{
              fontWeight: "bold",
              color: "#009999",
              fontFamily: "'Roboto', sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.userName}
          </h2>
          <p
            className="mb-0"
            style={{ color: "#606770", fontFamily: "'Roboto', sans-serif" }}
          >
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
      <div style={{ flexGrow: 0, marginLeft: "auto", marginRight: "20px" }}>
        {" "}
        {/* Adjust the spacing here */}
        {userId === loggedInUserId ? (
          <Link to="/profile/edit" className="btn btn-show">
            Edit profile
          </Link>
        ) : (
          <button
            className={`btn ${isFollowing ? "btn-primary" : "btn-show"}`}
            onClick={handleFollowUnfollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="text-end" style={{ minWidth: "100px" }}>
        {" "}
        {/* Ensure a minimum width for alignment */}
        <p
          className="mb-1"
          style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#009999" }}
        >
          {followers}
        </p>
        <p className="small text-muted">Followers</p>
        <p
          className="mb-1"
          style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#009999" }}
        >
          {following}
        </p>
        <p className="small text-muted">Following</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
