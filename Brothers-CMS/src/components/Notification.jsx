import React, { useState, useEffect } from "react";

const Notification = ({ children, type = "success", autoDismiss = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setVisible(false), autoDismiss);

    return () => clearTimeout(timeoutId);
  }, [children, autoDismiss]);

  const notificationClasses = ({ type }) =>
    ({
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
    }[type]);

  return (
    visible && (
      <div
        className={`fixed top-0 right-0 z-50 rounded-md p-4 ${notificationClasses(
          {
            type,
          }
        )}`}
      >
        <p className="font-medium">{children}</p>
      </div>
    )
  );
};

export default Notification;
