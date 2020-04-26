import React, { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import styles from "../css/listings.module.css";
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
          {/* <div className={styles.bg}>
          <main className={styles.grid}> */}
          {notifications.map(item => {
            return (
              <NotificationCard notification={item} key={item.notificationId} />
            );
          })}
          {/* </main>
        </div> */}
        </div>
      )}
    </>
  );
};

export default Notifications;
