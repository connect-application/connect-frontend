import axios from "axios";


const POST_API_BASE_URL = 'http://localhost:8080/posts/getFeed';
const POST_API_CREATE_URL = 'http://localhost:8080/posts/addPost';

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
}

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

export default new PostService();
