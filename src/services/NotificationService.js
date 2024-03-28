// NotificationService.js

import axios from "axios";

const NOTIFICATION_API_BASE_URL = 'http://localhost:8080/notify/';

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
