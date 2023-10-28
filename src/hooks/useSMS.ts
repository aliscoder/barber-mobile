import axios from "axios";
import { useCallback, useState } from "react";

const useSMS = () => {
  const [timer, setTimer] = useState(0);

  const sendVerificationSMS = useCallback(async (mobile: string) => {
    await axios.post(
      "https://raygansms.com/AutoSendCode.ashx",
      {
        UserName: "shaludama",
        Password: "Ali8825512217",
        Mobile: mobile,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }, []);
};

export default useSMS;
