import {
  Card,
  Column,
  Container,
  Error,
  List,
  Loading,
  RowBetween,
  TextNormal,
  TextTiny,
} from "@components";
import { useGetBarberServicesQuery } from "@state/api/client";
import React from "react";

interface Props {
  id: string;
}
const Services: React.FC<Props> = ({ id }) => {
  const { isLoading, isError, data: services, refetch } = useGetBarberServicesQuery(id);

  return isLoading ? (
    <Loading />
  ) : isError || !services ? (
    <Error />
  ) : (
    <Container hasHeader={false} px={2}>
      <Card transparent>
        <List
          showsVerticalScrollIndicator={false}
          data={services}
          renderItem={({ item }) => (
            <RowBetween my={3}>
              <TextNormal color="text.secondary">{item.price.toLocaleString()} تومان</TextNormal>
              <Column alignItems="flex-end">
                <TextNormal color="text.main">{item.name}</TextNormal>
                <TextTiny color="text.muted">{item.time} دقیقه</TextTiny>
                <TextTiny mt={3} maxW="3/4" color="text.muted">
                  {item.description}
                </TextTiny>
              </Column>
            </RowBetween>
          )}
        />
      </Card>
    </Container>
  );
};

export default Services;
