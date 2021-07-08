import { notification } from "antd";
import "./NotifSuccess.css";
export const openNotification = (placement, title, icon, style) => {
  notification.success({
    placement,
    duration: 4,
    message: title,
    icon: icon,
    style: style,
  });
};
