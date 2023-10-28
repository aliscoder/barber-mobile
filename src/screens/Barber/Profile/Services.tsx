import { Card, Column, Container, List, RowBetween } from "@components";
import { useAuth } from "@hooks";
import { price } from "@utils";
import { Text } from "native-base";
import React from "react";

const Services = () => {
  const { user } = useAuth();
  return (
    <Container hasHeader={false} px={2}>
      <Card shadowed={false}>
        <List
          showsVerticalScrollIndicator={false}
          data={user.services}
          renderItem={({ item }) => (
            <RowBetween my={3}>
              <Text color="text.secondary" fontSize="md">
                {price(item.price)} تومان
              </Text>
              <Column alignItems="flex-end">
                <Text color="text.main" fontSize="md">
                  {item.name}
                </Text>
                <Text color="text.muted" fontSize="sm">
                  {item.time} دقیقه
                </Text>
                <Text mt={3} maxW="3/4" color="text.muted" fontSize="sm">
                  {item.description}
                </Text>
              </Column>
            </RowBetween>
          )}
        />
      </Card>
    </Container>
  );
};

export default Services;
