// src/NotificationContext.js
import React, { createContext, useContext } from 'react';
import { store } from 'react-notifications-component';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }) => {
  const notify = ({ title, message, type }) => {
    // Ensure store is available
    if (!store) {
      console.error('Notification store is undefined');
      return;
    }
if(!children){
    console.log('erorrr');
}
    // Call addNotification
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
