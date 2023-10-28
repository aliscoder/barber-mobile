import {
  Avatar,
  Background,
  Card,
  Column,
  Container,
  Image as FastImage,
  Modal,
  TextTitle,
  Touch,
} from "@components";
import { MaterialCommunityIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { useAuth, useImagePicker, useModal, usePhoto } from "@hooks";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import {} from "@state/api/client";
import { useAddSampleMutation, useDeleteSampleMutation } from "@state/api/shared";
import { ClientInterface } from "@types";
import { Center, FlatList, Flex, Icon, Pressable, ScrollView, Spinner, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import BarberMiniCard from "./Components/BarberMiniCard";

const Profile = () => {
  const { navigate } = useNavigation<ClientScreenNavigationProp>();
  const { user, logout } = useAuth();
  const { BarberHeader, SearchLogo, BarberLogo } = usePhoto();
  const { isOpen, openModal, closeModal, showFullImage, modalImage } = useModal();
  const { image: sample, pickImage, clearImageInput } = useImagePicker();
  const [preview, setPreview] = useState("");

  const [
    addSample,
    { isLoading: addSampleLoading, isSuccess: addSampleSuccess, isError: addSampleError },
  ] = useAddSampleMutation();

  const [deleteSample, { isLoading: deleteSampleLoading }] = useDeleteSampleMutation();

  const sampleData = {
    userId: user._id,
    sample,
  };

  const handleDelete = useCallback(() => {
    deleteSample({ userId: user._id, sampleUrl: modalImage }).then(() => closeModal());
  }, [modalImage]);

  useEffect(() => {
    if (sample) {
      setPreview(sample);
      addSample(sampleData);
      clearImageInput();
    }
  }, [sample]);

  useEffect(() => {
    if (addSampleSuccess) {
      setPreview("");
    }
  }, [addSampleSuccess]);

  return (
    <Container
      px={3}
      headerLeftElement={
        <Touch onPress={logout}>
          <Icon name="power" as={SimpleLineIcons} color="text.muted" size="lg" />
        </Touch>
      }
    >
      <View h="1/4" w="full">
        <Pressable onPress={() => navigate("EditAccount")}>
          <Background style={{ borderWidth: 0 }} size="100%" placholder={BarberHeader}>
            <Center flex={1}>
              <Column space={2}>
                <Avatar onPress={() => navigate("EditAccount")} uri={user.avatar} size="xl" />
                <TextTitle color="text.light" textAlign="center">
                  {user.name}
                </TextTitle>
              </Column>
            </Center>
          </Background>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column py={3} space={3}>
          <View>
            <Card title="لیست آرایشگران شما">
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                // estimatedItemSize={200}
                data={(user as ClientInterface).barbers}
                ListEmptyComponent={() => (
                  // @ts-ignore
                  <Pressable onPress={() => navigate("Main", { screen: "Search" })}>
                    <Background placholder={BarberLogo} size={170}>
                      <Center w="full" h="full">
                        <Icon as={Octicons} name="search" color="text.secondary" size="5xl" />
                      </Center>
                    </Background>
                  </Pressable>
                )}
                renderItem={({ item, index }) => <BarberMiniCard index={index} item={item} />}
              />
            </Card>
          </View>
          <View>
            <Card title="لیست عکس های شما">
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                // estimatedItemSize={170}
                data={user.samples}
                ListHeaderComponent={() => (
                  <Pressable onPress={pickImage}>
                    <Background placholder={SearchLogo} preview={preview} size={170}>
                      <Center w="full" h="full">
                        {addSampleLoading ? (
                          <Spinner color="text.secondary" size="lg" />
                        ) : addSampleError ? (
                          <Touch onPress={() => addSample(sampleData)}>
                            <Icon
                              size="lg"
                              name="refresh"
                              color="text.main"
                              as={MaterialCommunityIcons}
                            />
                          </Touch>
                        ) : (
                          <Icon
                            as={MaterialCommunityIcons}
                            name="image-search-outline"
                            color="text.secondary"
                            size="5xl"
                          />
                        )}
                      </Center>
                    </Background>
                  </Pressable>
                )}
                renderItem={({ item }) => {
                  return (
                    <Pressable onPress={() => showFullImage(item)}>
                      <Background
                        size={170}
                        imageOpacity={0.8}
                        style={{ marginLeft: 5, overflow: "hidden", borderWidth: 0.5 }}
                        imageURL={item}
                      >
                        <></>
                      </Background>
                    </Pressable>
                  );
                }}
              />
            </Card>
          </View>
        </Column>
      </ScrollView>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Flex justifyContent="center" alignItems="center">
          <FastImage border radius={20} size={350} uri={modalImage} />
          <Touch style={{ marginTop: 9 }} onPress={handleDelete}>
            {deleteSampleLoading ? (
              <Spinner size={24} color="danger" />
            ) : (
              <Icon as={MaterialCommunityIcons} size="2xl" name="delete" color="danger" />
            )}
          </Touch>
        </Flex>
      </Modal>
    </Container>
  );
};

export default Profile;
