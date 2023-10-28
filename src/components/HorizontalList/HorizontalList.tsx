import { Center, View } from "native-base";
import React from "react";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { Loading, NetError } from "../Animation";

interface Props<T> extends FlashListProps<T> {
  isLoading?: boolean;
  isError?: boolean;
}
function HorizontalList<F>({ isLoading, isError, ...rest }: Props<F>) {
  return isLoading ? (
    <Center flex={1}>
      <Loading />
    </Center>
  ) : isError ? (
    <Center flex={1}>
      <NetError />
    </Center>
  ) : (
    <View w="full">
      <FlashList showsHorizontalScrollIndicator={false} horizontal {...rest} />
    </View>
  );
}

export default HorizontalList;
