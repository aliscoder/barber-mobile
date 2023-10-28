import { FilterStringType } from "@types";
import { Flex, ScrollView, View } from "native-base";
import React, { memo } from "react";
import FilterLabel from "./FilterLabel";

type Props = {
  activeFilter: FilterStringType;
  onChangeFilter: (item: FilterStringType) => void;
  searchText: string;
  isSearchActive: boolean;
  onClose: () => void;
};
const FilterBar: React.FC<Props> = ({
  activeFilter,
  onChangeFilter,
  searchText,
  isSearchActive,
  onClose,
}) => {
  return (
    <View my={3}>
      {!isSearchActive ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterLabel
            first
            selected={activeFilter === "free"}
            onFilter={() => onChangeFilter("free")}
            title="آزاد برای امروز"
            icon="md-calendar-outline"
          />
          <FilterLabel
            selected={activeFilter === "rating"}
            onFilter={() => onChangeFilter("rating")}
            title="محبوب ترین"
            icon="heart-outline"
          />
          <FilterLabel
            selected={activeFilter === "distance"}
            onFilter={() => onChangeFilter("distance")}
            title="نزدیکترین"
            icon="walk-outline"
          />
          <FilterLabel
            selected={activeFilter === "clientCount"}
            onFilter={() => onChangeFilter("clientCount")}
            title="بیشترین مشتری"
            icon="eye-outline"
          />
        </ScrollView>
      ) : (
        <Flex>
          <FilterLabel
            width={40}
            mr={0}
            alignSelf="flex-end"
            selected={isSearchActive}
            onFilter={onClose}
            title={`لغو جستجو برای " ${searchText} "`}
            icon="close"
          />
        </Flex>
      )}
    </View>
  );
};

export default memo(FilterBar);
