import axios from "axios";

export const addActivity = async (activityData) => {
  const token = localStorage.getItem("jwtToken");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const url = `${API_URL}/activity/addActivity`;
    const response = await axios.post(url, {
      categoryId: activityData.categoryId,
      statusId: activityData.statusId,
      startTime: activityData.startTime,
      endTime: activityData.endTime,
      recurring: activityData.recurring,
      shared: activityData.shared,
      notified: activityData.notified,
      postText: activityData.postText,
      files: activityData.files,
    },options);
    return response.data;
  } catch (error) {
    throw error;
  }
};