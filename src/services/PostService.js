import axios from 'axios';

const POST_API_BASE_URL = 'http://localhost:8080/posts/';

class PostService {
    getAllPosts(userId, jwtToken) { // Declare userId and jwtToken as parameters
        return axios.get(`${POST_API_BASE_URL}${userId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }
}

export default new PostService();
