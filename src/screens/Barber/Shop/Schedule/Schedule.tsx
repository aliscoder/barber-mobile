import { Button, Container, Row } from "@components";
import { useAuth, useBarberNavigator, useToast } from "@hooks";
import { useCompleteShopScheduleMutation } from "@state/api/barber";
import { WorkTimeType } from "@types";
import { isEqual } from "lodash";
import React, { memo, useCallback, useEffect } from "react";
import DailySchedule from "./DailySchedule";
import WorkTimeProvider, { useWorktimeContext } from "./workTimeContext";

type PostDataType = {
  barberId: string;
  workTimes: WorkTimeType[];
};
const SubmittionArea = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: PostDataType) => void;
  isLoading: boolean;
}) => {
  const { state } = useWorktimeContext();
  const { user } = useAuth();

  return (
    <Row
      justifyContent="flex-end"
      width="100%"
      borderTopWidth={1}
      borderTopColor="secondary"
      background="primary"
      px={3}
      pt={3}
    >
      <Button
        isLoading={isLoading}
        title="ذخیره تغییرات"
        w="1/3"
        p={1.5}
        scheme="success"
        onPress={() => onSubmit({ workTimes: state, barberId: user._id })}
      />
    </Row>
  );
};
const Schedule = () => {
  const [completeSchedule, { isSuccess, isError, isLoading }] = useCompleteShopScheduleMutation();
  const { showError } = useToast();
  const { navigateInShop } = useBarberNavigator();

  const handlePostSchedule = useCallback((data: PostDataType) => {
    if (data.workTimes.length > 0) {
      let checkCounter = 1;
      data.workTimes.forEach((workTime) => {
        if (workTime.start > workTime.end || workTime.rest.start > workTime.rest.end) {
          showError("زمان شروع باید کمتر از زمان پایان کار باشد");
        } else if (
          workTime.start == "" ||
          workTime.end == "" ||
          workTime.rest.start == "" ||
          workTime.rest.end == ""
        ) {
          showError("زمان شروع و پایان باید تکمیل باشد");
        } else {
          checkCounter += 1;
          if (checkCounter === data.workTimes.length) {
            completeSchedule(data);
          }
        }
      });
    } else {
      showError("ساعات کار را تکمیل کنید");
    }
  }, []);

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      navigateInShop({ screen: "Entry" });
    }
  }, [isSuccess, isError]);

  return (
    <Container headerTitle="برنامه کاری هفتگی">
      <WorkTimeProvider>
        <DailySchedule />
        <SubmittionArea isLoading={isLoading} onSubmit={handlePostSchedule} />
      </WorkTimeProvider>
    </Container>
  );
};

export default memo(Schedule, isEqual);
