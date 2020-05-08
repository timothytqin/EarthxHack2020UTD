import React from "react";
import { useSelector } from "react-redux";
import NotificationCard from "../components/NotificationCard";
import Typography from "@material-ui/core/Typography";

const Notifications = props => {
  const notifications = useSelector(state => state.user.notifications);
  return (
    <>
      {notifications && (
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Notifications
          </Typography>
          {notifications.map(item => {
            return (
              <NotificationCard notification={item} key={item.notificationId} />
            );
          })}
          {notifications.length === 0 && (
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: "1em" }}
            >
              You have no notifications. When someone requests for your listing,
              it will show up here.
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;
