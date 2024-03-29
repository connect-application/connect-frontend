// NotificationService.js

import axios from "axios";
import API_URL from "../config";

const NOTIFICATION_API_BASE_URL = `${API_URL}/notify/`;

class NotificationService {
    getAllNotifications() {
        return axios.get(`${NOTIFICATION_API_BASE_URL}loadNotifications`);
    }

    markAllAsRead() {

        return axios.post(`${NOTIFICATION_API_BASE_URL}markAllAsRead`);
    }

    markAsRead(notificationId) {

        return axios.post(`${NOTIFICATION_API_BASE_URL}readNotification?notificationId=${notificationId}`);
    }
}

export default new NotificationService();
