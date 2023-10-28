import { Container, Input, List } from "@components";
import { BarberInterface } from "@types";
import React, { useCallback } from "react";
import BarberCard from "./Components/BarberCard";
import FilterBar from "./Components/FilterBar";
import { useGetFilteredBarbers } from "./hooks/useGetFilteredBarbers";
import { useSearchBarbers } from "./hooks/useSearchBarbers";

const Search = () => {
  const { filter, setFilter, filterLoading, filterError, barbers, refreshFilter } =
    useGetFilteredBarbers();
  const {
    search,
    setSearch,
    handleSearch,
    searchLoading,
    isSearchActive,
    setIsSearchActive,
    searchError,
    searched,
  } = useSearchBarbers();

  const handleFilter = useCallback(
    (item: string) => {
      if (filter === item) {
        setFilter("");
      } else {
        setFilter(item);
      }
    },
    [filter]
  );

  const handleCloseSearch = useCallback(() => {
    setIsSearchActive(false);
    setSearch("");
  }, [search]);

  const keyExtractHandler = useCallback((item: BarberInterface) => {
    return item._id;
  }, []);

  const renderHandler = useCallback(({ item, index }: { item: BarberInterface; index: number }) => {
    return <BarberCard item={item} mt={index !== 0 ? 2 : 0} />;
  }, []);

  const BARBERS = isSearchActive ? searched : barbers;

  return (
    <Container hasHeader={false} pt={2} px={2}>
      <Input
        onChangeText={setSearch}
        value={isSearchActive ? "" : search}
        icon="search"
        placeholder="جستجو"
        onAction={handleSearch}
      />

      <FilterBar
        activeFilter={filter}
        onChangeFilter={handleFilter}
        isSearchActive={isSearchActive}
        searchText={search}
        onClose={handleCloseSearch}
      />
      <List
        isPerformant
        space={2}
        contentContainerStyle={{ paddingBottom: 5 }}
        estimatedItemSize={200}
        isError={filterError || searchError}
        isLoading={filterLoading || searchLoading}
        data={BARBERS}
        keyExtractor={keyExtractHandler}
        renderItem={renderHandler}
      />
    </Container>
  );
};

export default Search;
