// userService.js
import axios from "axios";


export const getUser = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost:8080/user/${userId}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFollowersCount = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`http://localhost:8080/follow/getCountFollowers?userId=${userId}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFollowingCount = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`http://localhost:8080/follow/getCountFollowing?userId=${userId}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFollowersList = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`http://localhost:8080/follow/getFollowers?userId=${userId}`, options);
    const followersListData = await response.data;
    const followersUserData = await Promise.all(
      followersListData.map(async (follower) => {
        const response = await axios.get(`http://localhost:8080/user/${follower.followedBy}`, options);
        return response.data;
      })
    );
    return followersUserData;
  } catch (error) {
    throw error;
  }
};

export const getFollowingsList = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`http://localhost:8080/follow/getFollowing?userId=${userId}`, options);
    const followingsListData = await response.data;
    const followingsUserData = await Promise.all(
      followingsListData.map(async (following) => {
        const response = await axios.get(`http://localhost:8080/user/${following.userId}`, options);
        return response.data;
      })
    );
    return followingsUserData;
  } catch (error) {
    throw error;
  }
};

export const toggleFollow = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const url = `http://localhost:8080/follow/toggleFollow?toFollow=${userId}`;
    console.log('Request URL:', url);
    console.log('Request headers:', options.headers);
    const response = await axios.post(url, {}, options);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    console.log('Request failed:', error);
    throw error;
  }
};

export const editFirstName = async (newFirstName) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const url = `http://localhost:8080/user/editFirstName?firstName=${newFirstName}`;
    const response = await axios.post(url, {}, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editLastName = async (newLastName) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const url = `http://localhost:8080/user/editLastName?lastName=${newLastName}`;
    const response = await axios.post(url, {}, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editAbout = async (newAbout) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const url = `http://localhost:8080/user/editAbout?about=${newAbout}`;
    const response = await axios.post(url, {}, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editDOB = async (newDOB) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const url = `http://localhost:8080/user/editDateOfBirth?dateOfBirth=${newDOB}`;
    const response = await axios.post(url, {}, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProfilePic = async (newProfilePic) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
  };

  try {
    const url = `http://localhost:8080/user/editProfilePic`;
    const response = await axios.post(url, newProfilePic, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};