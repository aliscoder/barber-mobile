import { View } from "native-base";
import { Box, Center, useTheme } from "native-base";
import { Platform } from "react-native";
import RNModal from "react-native-modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isSheet?: boolean;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children, isSheet = false }) => {
  const theme = useTheme();

  return (
    <RNModal
      backdropOpacity={0.9}
      useNativeDriver
      style={isSheet && { justifyContent: "flex-end", margin: 0 }}
      // backdropColor={isSheet ? theme.colors.primary : "white"}
      backdropColor="#F4F6FC"
      hardwareAccelerated
      animationIn={isSheet ? "slideInUp" : "fadeIn"}
      animationOut={isSheet ? "slideOutDown" : "fadeOut"}
      isVisible={isOpen}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      {Platform.OS === "web" ? (
        <View w="full" alignItems="center">
          <>
            {isSheet ? (
              <Box
                shadow="9"
                p={3}
                w="full"
                maxW={600}
                background="white"
                borderTopColor="gray.200"
                borderTopWidth={2}
              >
                <Center pt={1} pb={5}>
                  <Box w={12} h={1} borderRadius={25} background="text.dark" />
                </Center>
                {children}
              </Box>
            ) : (
              children
            )}
          </>
        </View>
      ) : (
        <>
          {isSheet ? (
            <Box
              shadow="9"
              p={3}
              maxW={600}
              background="white"
              borderTopColor="gray.200"
              borderTopWidth={2}
            >
              <Center pt={1} pb={5}>
                <Box w={12} h={1} borderRadius={25} background="text.dark" />
              </Center>
              {children}
            </Box>
          ) : (
            children
          )}
        </>
      )}
    </RNModal>
  );
};

export default Modal;
