import axios from 'axios';

const POST_API_BASE_URL = 'http://localhost:8080/posts/';
const POST_API_CREATE_URL = 'http://localhost:8080/addPost/';


class PostService {
    getAllPosts(userId) { // Declare userId and jwtToken as parameters
        return axios.get(`${POST_API_BASE_URL}${userId}`);
    }

    createPost(postText,isPublic){
        return axios.get(`${POST_API_CREATE_URL}postText=${postText}&isPublic=${isPublic}`);
    }
}

export default new PostService();
