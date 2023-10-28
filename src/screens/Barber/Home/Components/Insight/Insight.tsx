import { Card, Skeleton } from "@components";
import { isEqual } from "lodash";
import { ScrollView } from "native-base";
import React, { memo } from "react";
import useSchedule from "../useSchedule";
import WeekDaysChart from "./WeekDayChart";

const Insight = () => {
  const { isLoading, completed } = useSchedule();

  return (
    <Skeleton isLoaded={!isLoading} h="80">
      <Card transparent title="نمودار آماری">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card shadowed={false} subtitle="قرارهای به اتمام رسیده">
            <WeekDaysChart appts={completed.total} />
          </Card>
          <Card shadowed={false} ml={5} subtitle="درامد">
            <WeekDaysChart appts={completed.total} />
          </Card>
        </ScrollView>
      </Card>
    </Skeleton>
  );
};

export default memo(Insight, isEqual);
