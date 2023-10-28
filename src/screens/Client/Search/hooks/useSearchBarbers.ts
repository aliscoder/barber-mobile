import { useAuth, useLocation } from "@hooks";
import { useSearchBarbersMutation } from "@state/api/client";
import { useState } from "react";

export const useSearchBarbers = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchBarbers, { isLoading, isError, data: searched }] = useSearchBarbersMutation();
  const { lastLocation: location } = useLocation();
  function handleSearch() {
    if (search.length > 1) {
      setIsSearchActive(true);
      searchBarbers({ search, gender: user.gender, location });
    }
  }

  return {
    search,
    setSearch,
    handleSearch,
    isSearchActive,
    setIsSearchActive,
    searchLoading: isLoading,
    searchError: isError,
    searched,
  };
};
