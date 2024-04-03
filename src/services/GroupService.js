import axios from "axios";
import API_URL from "../config";


const GROUP_API_GET_MEMBERS_URL = `${API_URL}/group/getGroupUsers`;
const GROUP_API_GET_LEADERBOARD_URL = `${API_URL}/group/getLeaderboard`;
const GROUP_API_JOIN_URL = `${API_URL}/group/joinGroup`;
const GROUP_API_EXIT_URL = `${API_URL}/group/exitGroup`;

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

    async exitGroup(groupId){
      const token = localStorage.getItem("jwtToken");
      const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response =await axios.post(`${GROUP_API_EXIT_URL}?groupId=${groupId}`);;
          
          if (response.data === "ERROR:  groupOwner cannot exit. Please change ownership") {
            alert("ERROR:  groupOwner cannot exit. Please change ownership");
            return;
        }
          return response.data;
        } catch (error) {
          throw error;
        }    
  }

  async joinGroup(groupId, groupCode){
    const token = localStorage.getItem("jwtToken");
    const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response =await axios.post(`${GROUP_API_JOIN_URL}?groupId=${groupId}&code=${groupCode}`);;
        if (response.data === "ERROR:  Invalid code") {
          alert("Error: Invalid code");
          return;
      }
        return response.data;
      } catch (error) {
        throw error;
      }    
}
    

}
export default new GroupService();