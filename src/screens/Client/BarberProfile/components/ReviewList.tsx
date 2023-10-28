import { Avatar, Column, List, Rating, Row, RowBetween } from "@components";
import { ReviewType } from "@types";
import moment from "jalali-moment";
import { isEqual } from "lodash";
import { Text } from "native-base";
import React, { memo } from "react";

type Props = {
  reviews: ReviewType[];
};
const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <List
      data={reviews}
      contentContainerStyle={{ paddingVertical: 15 }}
      renderItem={({ item, index }) => (
        <Column mt={index !== 0 ? 5 : 0}>
          <RowBetween>
            <Rating rating={item.rating} />
            <Row space={3}>
              <Column>
                <Text fontSize="md" color="text.muted">
                  {item.rater.name}
                </Text>
                <Text fontSize="sm" color="text.muted">
                  {moment.unix(item.date).format("D MMM")}
                </Text>
              </Column>
              <Avatar size="sm" uri={item.rater.avatar} />
            </Row>
          </RowBetween>
          <Text color="text.main" fontSize="md" mt={3} mr={42}>
            {item.review}
          </Text>
        </Column>
      )}
    />
  );
};

export default memo(ReviewList, isEqual);
