import { Container, Row, Touch } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useBarberNavigator } from "@hooks";
import { unix } from "@utils";
import { Icon } from "native-base";
import React, { PropsWithChildren, memo, useCallback, useState } from "react";
import ApptList from "./ApptList";
import DateSection from "./Reservation/components/DateSection";

const Wrapper: React.FC<PropsWithChildren> = memo(({ children }) => {
  const { navigateToRequestedAppts, navigateToReservation } = useBarberNavigator();
  return (
    <Container
      px={3}
      headerTitle="قرار ملاقات ها"
      headerLeftElement={
        <Row space={1}>
          <Touch onPress={navigateToRequestedAppts}>
            <Icon as={Ionicons} name="clipboard-outline" color="secondary" size="lg" />
          </Touch>

          <Touch onPress={navigateToReservation}>
            <Icon as={Ionicons} name="add" color="secondary" size="2xl" />
          </Touch>
        </Row>
      }
    >
      {children}
    </Container>
  );
});

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(unix());

  const handleDayChange = useCallback((item: number) => {
    setSelectedDay(item);
  }, []);
  return (
    <Wrapper>
      <DateSection selected={selectedDay} length={20} onChangeDate={handleDayChange} />
      <ApptList selected={selectedDay} />
    </Wrapper>
  );
};

export default Calendar;
