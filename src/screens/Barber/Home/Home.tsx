import { Column, Container, Seperative, Touch } from "@components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { Icon, ScrollView } from "native-base";
import React from "react";
import DesignCard from "./Components/DesignCard";
import Insight from "./Components/Insight/Insight";
import StatContainer from "./Components/Stats/Stats";
import TodayAppts from "./Components/TodayAppts";
import ScheduleCard from "./Components/TodaySchedule/ScheduleCard";

const Home = () => {
  const { navigateInShop } = useBarberNavigator();
  const { logout } = useAuth();

  return (
    <Container
      px={4}
      headerLeftElement={
        <Touch onPress={logout}>
          <Icon name="power" as={SimpleLineIcons} color="text.muted" size="lg" />
        </Touch>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space={3}>
          <Seperative>
            <DesignCard onPress={() => navigateInShop({ screen: "Entry" })} />
            <ScheduleCard />
            <StatContainer />
            <TodayAppts />
            <Insight />
          </Seperative>
        </Column>
      </ScrollView>
    </Container>
  );
};

export default Home;
