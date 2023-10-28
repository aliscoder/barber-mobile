import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useSendCodeAgain = () => {
  const [timer, setTimer] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // exit early when we reach 0
    if (!timer) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timer]);

  const sendCodeAgain = useCallback(async (mobile: string) => {
    setLoading(true);
    await axios
      .post(
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
      )
      .finally(() => {
        setTimer(120);
        setLoading(false);
      });
  }, []);

  return { sendCodeAgain, isLoading, timer };
};

export default useSendCodeAgain;
