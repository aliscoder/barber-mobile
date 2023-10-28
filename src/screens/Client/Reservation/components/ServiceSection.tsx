import { Card, Column, Row, RowBetween, TextMuted, TextNormal, TextTiny } from "@components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ServiceType } from "@types";
import { price } from "@utils";
import { isEqual } from "lodash";
import { Icon, Pressable } from "native-base";
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

  const keyExtractHandler = useCallback((item: ServiceType) => {
    return item.name;
  }, []);

  return (
    <Card title="انتخاب نوع خدمات" subtitle="نوع خدمت مورد نظر را انتخاب کنید">
      {services.map((item) => (
        <Fragment key={item._id}>{renderServices({ item })}</Fragment>
      ))}
    </Card>
  );
};

export default memo(ServiceSection, isEqual);
