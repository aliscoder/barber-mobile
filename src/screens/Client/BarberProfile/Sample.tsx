import { Container, Error, Image as FastImage, Loading, Modal } from "@components";
import { useModal } from "@hooks";
import { MasonryFlashList } from "@shopify/flash-list";
import { useGetBarberSamplesQuery } from "@state/api/client";
import { Flex, Pressable, useTheme } from "native-base";
import React from "react";
import { Image } from "react-native-expo-image-cache";

interface Props {
  id: string;
}
const Sample: React.FC<Props> = ({ id }) => {
  const { isLoading, isError, data: samples } = useGetBarberSamplesQuery(id);
  const { isOpen, closeModal, openModal, modalImage, showFullImage } = useModal();
  const theme = useTheme();
  return isLoading ? (
    <Loading />
  ) : isError || !samples ? (
    <Error />
  ) : (
    <Container hasHeader={false}>
      {samples.length > 0 && (
        <MasonryFlashList
          estimatedItemSize={50}
          data={samples}
          keyExtractor={(item): string => item}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable onPress={() => showFullImage(item)}>
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  borderWidth: 2,
                  borderColor: theme.colors.primary,
                }}
                uri={item}
              />
            </Pressable>
          )}
          onEndReachedThreshold={0.1}
        />
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Flex justifyContent="center" alignItems="center">
          <FastImage border radius={20} size={350} uri={modalImage} />
        </Flex>
      </Modal>
    </Container>
  );
};

export default Sample;
