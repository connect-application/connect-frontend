import axios from "axios";
import API_URL from "../config";


const POST_API_BASE_URL = `${API_URL}/posts/getFeed`;
const POST_API_CREATE_URL = `${API_URL}/posts/addPost`;
const POST_API_GROUP_POSTS_URL = `${API_URL}/posts/getGroupPosts`;
const POST_API_LIKE_URL = `${API_URL}/like/togglePostLike`;
const POST_API_GET_LIKE_URL = `${API_URL}/like/getCountLikes`;
const POST_API_GET_COMMENTS_URL = `${API_URL}/comments/getComments`;
const POST_API_ADD_COMMENTS_URL = `${API_URL}/comments/addComment`;
const POST_API_DELETE_POST_URL = `${API_URL}/posts/deletePost`;


class PostService {
    getAllPosts() { // Declare userId and jwtToken as parameters
        return axios.get(`${POST_API_BASE_URL}`);
    }

    createPost(postText,isPublic){
        return axios.post(`${POST_API_CREATE_URL}?postText=${postText}&isPublic=${isPublic}`);
    }

    likePost(postId){
      return axios.post(`${POST_API_LIKE_URL}?postId=${postId}`);
    }

    getLikes(postId){
      return axios.get(`${POST_API_GET_LIKE_URL}?postId=${postId}`);
    }

    fetchComments(postId){
        return axios.post(`${POST_API_GET_COMMENTS_URL}?postId=${postId}`);
    }
    deletePost(postId){
      return axios.post(`${POST_API_DELETE_POST_URL}?postId=${postId}`);
    }

    addComments(postId, commentText){
        return axios.post(`${POST_API_ADD_COMMENTS_URL}?postId=${postId}&commentText=${commentText}`);
    }

    async getUserGroups() {
        const token = localStorage.getItem("jwtToken");
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      
        try {
          const response = await axios.get(`${API_URL}/group/getUserGroups`, options);
          return response.data;
        } catch (error) {
          throw error;
        }
      }

      async getGroupPosts(groupId){
        const token = localStorage.getItem("jwtToken");
        const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response =await axios.get(`${POST_API_GROUP_POSTS_URL}?groupId=${groupId}`);;
            return response.data;
          } catch (error) {
            throw error;
          }    
    }
}

export const getCurrentUserPosts = async () => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/posts/getCurrentUserPosts`, options);
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
    const response = await axios.get(`${API_URL}/posts/${userId}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createActivity = async (formData) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post(`${API_URL}/activity/addActivity`, formData, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostAttachments = async (postId) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/posts/getPostAttachments?postId=${postId}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default new PostService();