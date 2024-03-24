import axios from "axios";

export const getCurrentUserPosts = async () => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost:8080/posts/getCurrentUserPosts`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost:8080/posts/${userId}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};