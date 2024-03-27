import React, { useState, useEffect } from "react";
import Common from '../../Common';
import { SIDEBAR_DATA as dummyData } from '../Data';
import NotificationService from "../../services/NotificationService";

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await NotificationService.getAllNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      // After marking all notifications as read, refetch notifications to update the UI
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleReadNotification = async (notificationId) => {
    try {
      
      await NotificationService.markAsRead(notificationId);
      // After marking the notification as read, refetch notifications to update the UI
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <Common dummyData={dummyData}>
      <div id = "colorPage">
        <h2>Notifications</h2>
        <div>
          <div style={{ textAlign: 'right',  marginBottom: '10px' }}>
            {/* Button to mark all notifications as read */}
            <button className="btn btn-primary" onClick={handleMarkAllAsRead}>Mark All as Read</button>
          </div>
          
          <div>
            {/* Display each notification */}
            {notifications.map((notification) => (
              <div key={notification.notificationId} style={notificationBoxStyle}>
                <p>{notification.notificationText}</p>
                <p>Created At: {notification.createdAt}</p>
                {/* Link to mark individual notification as read */}
                <button style={{ float: 'right' }} className="btn btn-primary" onClick={() => handleReadNotification(notification.notificationId)}>Mark as Read {notification.notificationId} </button>
              </div>
            ))}
          </div>
        </div>
        

      </div>
    </Common>
  );
}

const notificationBoxStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  overflow: "hidden"
};

export default Notification;
