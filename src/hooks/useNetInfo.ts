import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useNetInfo = () => {
  const [netInfo, setNetInfo] = useState<NetInfoState>();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { netInfo };
};

export default useNetInfo;
