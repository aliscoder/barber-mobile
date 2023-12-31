import { Avatar, Card, Column, Row, RowBetween, TextMuted, TextTitle } from "@components";
import { ClientScreenNavigationProp } from "@navigation/types";
import { BarberStackNavigationProp } from "@navigation/types/barberTypes";
import { useNavigation } from "@react-navigation/native";
import { apptClient } from "@screens/Barber/utils";
import { AppointmentInterface } from "@types";
import { CONVERTER } from "@utils";
import moment from "jalali-moment";
import { IPressableProps, Pressable, Text, View } from "native-base";
import React from "react";
import { renderStatus } from "../../Client/Appointments/Components/Status";

interface Props extends IPressableProps {
  appointment: AppointmentInterface;
  noNav?: boolean;
  withService?: boolean;
  isClient?: boolean;
}
const AppointmentCard: React.FC<Props> = ({
  appointment,
  withService = true,
  noNav = false,
  isClient = false,
  ...rest
}) => {
  const { navigate } = useNavigation<ClientScreenNavigationProp>();
  const { navigate: barberNavigate } = useNavigation<BarberStackNavigationProp>();

  return (
    <Pressable
      onPress={
        noNav
          ? null
          : isClient
          ? () => barberNavigate("Appointment", { appointmentId: appointment._id })
          : () => navigate("Appointment", { appointmentId: appointment._id })
      }
      {...rest}
    >
      <Card>
        <RowBetween>
          <Column alignItems="center" space={3}>
            <Text color="text.main" fontSize="md">
              {moment.unix(appointment.date).format("D")}
            </Text>
            <Text color="text.main" fontSize="md">
              {moment.unix(appointment.date).format("MMM")}
            </Text>
            {renderStatus(appointment.status)}
          </Column>
          <Row space={2}>
            <Column alignItems="flex-end" space={2}>
              <TextTitle trunc>
                {isClient ? apptClient(appointment).name : appointment.barber.shopName}
              </TextTitle>
              {withService && (
                <View>
                  {appointment.services.map((service, index) => (
                    <TextMuted key={service.name}>{`${index + 1} - ${service.name}`}</TextMuted>
                  ))}
                </View>
              )}
              <TextMuted>
                {CONVERTER(appointment.startTime)} - {CONVERTER(appointment.endTime)}
              </TextMuted>
            </Column>
            <Avatar
              onPress={
                !isClient
                  ? () => navigate("BarberProfile", { id: appointment.barber._id! })
                  : undefined
              }
              uri={isClient ? appointment?.client?.avatar || undefined : appointment.barber.avatar}
              size="md"
            />
          </Row>
        </RowBetween>
      </Card>
    </Pressable>
  );
};

export default AppointmentCard;
