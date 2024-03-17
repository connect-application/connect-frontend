import axios from 'axios';


const POST_API_BASE_URL = 'http://localhost:8080/posts/getFeed';
const POST_API_CREATE_URL = 'http://localhost:8080/posts/addPost';

class PostService {
    getAllPosts() { // Declare userId and jwtToken as parameters
        return axios.get(`${POST_API_BASE_URL}`);
    }

    createPost(postText,isPublic){
        return axios.post(`${POST_API_CREATE_URL}?postText=${postText}&isPublic=${isPublic}`);
    }
}

export default new PostService();
