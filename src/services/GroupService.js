import axios from "axios";
import API_URL from "../config";


const GROUP_API_GET_MEMBERS_URL = `${API_URL}/group/getGroupUsers`;
const GROUP_API_GET_LEADERBOARD_URL = `${API_URL}/group/getLeaderboard`;

class GroupService{
    async getGroupUsers(groupId){
        const token = localStorage.getItem("jwtToken");
        const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response =await axios.get(`${GROUP_API_GET_MEMBERS_URL}?groupId=${groupId}`);;
            return response.data;
          } catch (error) {
            throw error;
          }    
    }

    async getGroupLeaderboard(groupId, leaderBoardType, leaderBoardTimeType){
        const token = localStorage.getItem("jwtToken");
        const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response =await axios.get(`${GROUP_API_GET_LEADERBOARD_URL}?groupId=${groupId}&leaderboardType=${leaderBoardType}&leaderboardTimeType=${leaderBoardTimeType}`);;
            return response.data;
          } catch (error) {
            throw error;
          }    
    }
    

}
export default new GroupService();