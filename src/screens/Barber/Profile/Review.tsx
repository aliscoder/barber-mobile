import { Container } from "@components";
import { useAuth } from "@hooks";
import ReviewList from "@screens/Client/BarberProfile/components/ReviewList";
import React from "react";

const Review = () => {
  const { user } = useAuth();

  return (
    <Container hasHeader={false} px={4}>
      <ReviewList reviews={user.reviews} />
    </Container>
  );
};

export default Review;
