import { CoordType } from "@types";
import { useEffect, useState } from "react";

const useAddress = (coords: CoordType) => {
  const [address, setAddress] = useState();

  useEffect(() => {
    (async function () {
      let response = await fetch(
        `https://api.neshan.org/v5/reverse?lat=${coords[1]}&lng=${coords[0]}`,
        {
          headers: {
            "Api-Key": "service.309570590da14b5285b77d5729cf00f1",
          },
        }
      );
      const address = await response.json();
      setAddress(address.formatted_address);
    })();
  }, []);

  return address;
};

export default useAddress;
