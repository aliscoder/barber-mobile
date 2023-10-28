import { useAuth, useLocation } from "@hooks";
import { useFilterBarbersMutation } from "@state/api/client";
import { useCallback, useEffect, useState } from "react";

export const useGetFilteredBarbers = () => {
  const { user } = useAuth();
  const { lastLocation: location } = useLocation();

  const [filter, setFilter] = useState("");
  const [getBarbers, { isLoading, isError, data: barbers }] = useFilterBarbersMutation();

  const filterBarbers = useCallback(() => {
    getBarbers({
      filter,
      gender: user.gender,
      location,
    });
  }, [location, user, filter]);

  useEffect(() => {
    filterBarbers();
  }, [filter, location]);

  return {
    filter,
    setFilter,
    filterLoading: isLoading,
    filterError: isError,
    barbers,
    refreshFilter: filterBarbers,
  };
};
