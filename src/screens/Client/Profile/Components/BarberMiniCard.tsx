import { Avatar, Button, ColumnBetween, TextTiny } from "@components";
import { usePhoto } from "@hooks";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { BarberInterface } from "@types";
import { useTheme } from "native-base";
import { ImageBackground } from "react-native";

interface Props {
  item: Partial<BarberInterface>;
  index: number;
}
const BarberMiniCard: React.FC<Props> = ({ item, index }) => {
  const { navigate } = useNavigation<ClientScreenNavigationProp>();
  const theme = useTheme();
  const { BarberLogo } = usePhoto();

  return (
    <ImageBackground
      source={BarberLogo}
      style={{
        width: 150,
        height: 150,
        marginLeft: index === 0 ? 0 : 5,
        borderRadius: 5,
        overflow: "hidden",
      }}
      imageStyle={{ opacity: 0.2 }}
    >
      <ColumnBetween
        h="full"
        pt={2}
        borderWidth={0.5}
        borderColor="border.muted"
        borderRadius={5}
        alignItems="center"
      >
        <Avatar
          size="lg"
          uri={item.avatar}
          onPress={() => navigate("BarberProfile", { id: item._id! })}
        />
        <TextTiny>{item.name}</TextTiny>
        <Button
          onPress={() => navigate("Reservation", { barberId: item._id! })}
          backgroundColor="secondary"
          w="full"
          borderRadius={0}
          title="دریافت نوبت"
        />
      </ColumnBetween>
    </ImageBackground>
  );
};

export default BarberMiniCard;
