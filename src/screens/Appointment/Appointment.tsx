import { ConfirmationModal, Container, Error, Loading } from "@components";
import { useAppDispatch, useAuth, useModal, usePushNotification } from "@hooks";
import { apptClient } from "@screens/Barber/utils";
import apptApi, { useGetAppointmentQuery } from "@state/api/appointment";
import barberApi from "@state/api/barber";
import { STATUS_NAME, getHourAndMinute } from "@utils";
import moment from "jalali-moment";
import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import { useApptSocket } from "./AppointmentProvider";
import { ActionCard } from "./Components/ActionCard";
import AppointmentCard from "./Components/AppointmentCard";
import ChatSection from "./Components/ChatSection";
import DescriptionSection from "./Components/DescriptionSection";

const Appointment = ({ id }: { id: string }) => {
  const { isBarber } = useAuth();
  const { data: appointment, isLoading, isError, refetch } = useGetAppointmentQuery(id);
  const socket = useApptSocket();
  const [selectedStatus, setSelectedStatus] = useState(appointment?.status);
  const { isOpen, openModal, closeModal } = useModal();
  const { sendIndieNotification } = usePushNotification();
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    if (appointment && selectedStatus) {
      closeModal();
      socket.emit("change-appt-status", { apptId: id, status: selectedStatus });
      dispatch(
        apptApi.util.updateQueryData("getAppointment", id, (draft) => {
          Object.assign(draft, { ...draft, status: selectedStatus });
        })
      );

      dispatch(barberApi.util.invalidateTags(["Schedule"]));
      if (selectedStatus !== "completed") {
        sendIndieNotification({
          userId:
            selectedStatus === "cancelled" ? appointment?.barber._id! : appointment?.client?._id!,
          title: "لغو نوبت",
          message:
            selectedStatus === "cancelled"
              ? `کاربر ${appointment?.client?.name} نوبت خود را لغو کرد`
              : `نوبت شما به آرایشگاه ${appointment?.barber.shopName} به وضعیت ${STATUS_NAME(
                  selectedStatus
                )} تغییر کرد`,
          extraData: { apptId: appointment?._id },
        });
      }
    }
  };

  useEffect(() => {
    console.log("Appointment runned");
    socket.on("status-changed", (newStatus) => {
      dispatch(
        apptApi.util.updateQueryData("getAppointment", id, (draft) => {
          Object.assign(draft, { ...draft, status: newStatus });
        })
      );
    });
  }, [socket]);

  return isLoading ? (
    <Loading />
  ) : isError || !appointment ? (
    <Error />
  ) : (
    <Container
      headerTitle={`قرار با ${
        isBarber ? apptClient(appointment).name! : appointment.barber.shopName
      }`}
    >
      <AppointmentCard isClient={!isBarber} noNav withService={false} appointment={appointment} />
      {appointment?.status !== "completed" && appointment?.status !== "cancelled" && (
        <ActionCard
          isTimePassed={
            moment
              .unix(appointment.date)
              .clone()
              .set({
                hour: getHourAndMinute(appointment?.startTime).hour,
                minute: getHourAndMinute(appointment?.startTime).minute,
              })
              .diff(moment()) < 0
          }
          apptStatus={appointment?.status}
          onChangeStatus={(status) => {
            setSelectedStatus(status);
            openModal();
          }}
        />
      )}
      <DescriptionSection appointment={appointment} />

      <ChatSection appointment={appointment} />

      <ConfirmationModal
        isOpen={isOpen}
        onClose={closeModal}
        onReject={closeModal}
        onConfirm={handleConfirm}
      >
        <Text color="text.dark" fontSize="lg">
          {`آیا از ${
            selectedStatus === "approved"
              ? "موافقت با "
              : selectedStatus === "rejected"
              ? "عدم موافقت با "
              : selectedStatus === "completed"
              ? "تکمیل "
              : selectedStatus === "cancelled"
              ? "لغو "
              : ""
          } نوبت اطمینان دارید`}
        </Text>
      </ConfirmationModal>
    </Container>
  );
};

export default Appointment;
