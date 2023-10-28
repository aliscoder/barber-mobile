import axios from "axios";
import moment from "jalali-moment";
import { useCallback } from "react";

type GlobalNotif = { title: string; body: string; extraData?: any; picUrl?: string };
type IndieNotif = { userId: string; title: string; message: string; extraData?: any };
type GroupNotif = { userIds: string[]; title: string; message: string; extraData?: any };

const usePushNotification = () => {
  const sendGlobalNotification = useCallback(({ title, body, extraData, picUrl }: GlobalNotif) => {
    axios
      .post("https://app.nativenotify.com/api/notification", {
        appId: 10431,
        appToken: "V8wgDzCPu2WtVabIlLPuuD",
        title,
        body,
        dateSent: moment().format(),
        pushData: extraData,
        bigPictureURL: picUrl,
      })
      .then(() => console.log("Notif Sent"))
      .catch(() => console.log("Notif Failed"));
  }, []);

  const sendIndieNotification = useCallback(({ userId, title, message, extraData }: IndieNotif) => {
    axios
      .post(`https://app.nativenotify.com/api/indie/notification`, {
        subID: userId,
        appId: 10431,
        appToken: "V8wgDzCPu2WtVabIlLPuuD",
        title,
        message,
        pushData: JSON.stringify(extraData),
      })
      .then(() => console.log("Notif Sent"))
      .catch(() => console.log("Notif Failed"));
  }, []);

  const sendGroupNotification = useCallback(
    ({ userIds, title, message, extraData }: GroupNotif) => {
      axios
        .post(`https://app.nativenotify.com/api/indie/group/notification`, {
          subIDs: userIds,
          appId: 10431,
          appToken: "V8wgDzCPu2WtVabIlLPuuD",
          title,
          message,
          pushData: extraData,
        })
        .then(() => console.log("Notif Sent"))
        .catch(() => console.log("Notif Failed"));
    },
    []
  );

  return { sendGlobalNotification, sendIndieNotification, sendGroupNotification };
};

export default usePushNotification;
