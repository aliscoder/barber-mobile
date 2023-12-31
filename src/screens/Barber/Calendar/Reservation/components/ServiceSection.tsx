import { Card, Column, Row, RowBetween, TextMuted, TextNormal, TextTiny, Touch } from "@components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBarberNavigator } from "@hooks";
import { ServiceType } from "@types";
import { price } from "@utils";
import { isEqual } from "lodash";
import { Center, Icon, Pressable } from "native-base";
import React, { Fragment, memo, useCallback } from "react";

type Props = {
  services: ServiceType[];
  onChangeService: (item: ServiceType) => void;
  selected: ServiceType[];
};
const ServiceSection: React.FC<Props> = ({ services, selected, onChangeService }) => {
  const changeService = useCallback((item: ServiceType) => {
    onChangeService(item);
  }, []);

  const { navigateInShop } = useBarberNavigator();

  const renderServices = useCallback(
    ({ item }: { item: ServiceType }) => (
      <Pressable onPress={() => changeService(item)}>
        <RowBetween my={1}>
          <TextNormal color="text.secondary">{price(item.price)} تومان</TextNormal>
          <Row justifyContent="flex-end" w="1/2" alignItems="center" space={5}>
            <Column space={0.5}>
              <TextNormal color="text.main">{item.name}</TextNormal>
              {item.description && <TextMuted fontSize="xs">{item.description}</TextMuted>}
              <TextTiny color="text.muted">{item.time} دقیقه</TextTiny>
            </Column>

            <Icon
              as={MaterialCommunityIcons}
              name={
                selected.find((service) => service.name === item.name)
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
              color="text.secondary"
              size="md"
            />
          </Row>
        </RowBetween>
      </Pressable>
    ),
    [selected]
  );

  return (
    <Card title="انتخاب نوع خدمات" subtitle="نوع خدمت مورد نظر را انتخاب کنید">
      {services.length === 0 ? (
        <Center>
          <Row space={2}>
            <Touch onPress={() => navigateInShop({ screen: "Service" })}>
              <Icon as={Ionicons} name="pencil" size="xs" color="danger" />
            </Touch>
            <TextTiny color="danger"> سرویس های شما نیاز به تکمیل دارد</TextTiny>
          </Row>
        </Center>
      ) : (
        services.map((item) => <Fragment key={item._id}>{renderServices({ item })}</Fragment>)
      )}
    </Card>
  );
};

export default memo(ServiceSection, isEqual);
