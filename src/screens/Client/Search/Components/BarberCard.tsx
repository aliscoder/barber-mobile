import { Avatar, Button, Card, Column, Image, Rating, Row, RowBetween } from "@components";
import { generateDistance, generateDistanceColor } from "@helpers";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { BarberInterface } from "@types";
import { isEqual } from "lodash";
import { Box, Flex, Pressable, Text } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import React, { memo, useCallback } from "react";
import { Linking } from "react-native";

interface BarberCardProps extends IViewProps {
  item: BarberInterface;
}
const BarberCard: React.FC<BarberCardProps> = ({ item, ...rest }) => {
  const { navigate } = useNavigation<ClientScreenNavigationProp>();

  const navigateToAppointment = useCallback(() => {
    navigate("Reservation", { barberId: item._id });
  }, [item._id]);

  const isAvaiable = item.workTime?.length > 0 && item.services?.length > 0;

  return (
    <Card px={2} transparent {...rest}>
      <Column space={3}>
        <RowBetween>
          {item.distance ? (
            <Box
              borderWidth={1}
              borderColor={generateDistanceColor(item.distance)}
              borderRadius={5}
              alignSelf="flex-start"
              backgroundColor={generateDistanceColor(item.distance)}
              px={2}
              py={1}
            >
              <Text>{generateDistance(item.distance)}</Text>
            </Box>
          ) : (
            <Pressable onPress={() => Linking.openSettings()}>
              <Text fontFamily="YekanBold" color="danger">
                مکانیابی را فعال کنید
              </Text>
            </Pressable>
          )}
          <Row space={3}>
            <Column>
              <Text fontSize="md" color="text.main">
                {item.shopName}
              </Text>

              <Text mb={2} fontSize="sm" color="text.muted">
                {item.address}
              </Text>

              <Flex alignItems="flex-end">
                <Rating rating={item.rating} />
              </Flex>
            </Column>
            <Avatar uri={item.avatar} size="md" />
          </Row>
        </RowBetween>
        <FlashList
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={120}
          horizontal
          data={item.samples}
          renderItem={({ item }) => <Image border radius={5} size={120} uri={item} />}
        />

        <RowBetween>
          <Button
            w="30%"
            scheme="warning"
            outline
            onPress={() => navigate("BarberProfile", { id: item._id })}
            title="پروفایل"
          />
          <Button
            w="68%"
            scheme="secondary"
            outline
            isDisabled={!isAvaiable}
            onPress={navigateToAppointment}
            title={isAvaiable ? "دریافت نوبت" : "برنامه کاری آرایشگر ناقص است"}
          />
        </RowBetween>
      </Column>
    </Card>
  );
};

export default memo(BarberCard, isEqual);
