import React from "react";
import { useSelector } from "react-redux";
import { Notification } from "@mantine/core";

const Notice = () => {
  const message = useSelector((state) => state.notification);

  if (message !== "") {
    return <Notification>{message}</Notification>;
  }
};

export default Notice;
