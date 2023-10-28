import { Text, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import { ColorType } from "native-base/lib/typescript/components/types";
import React from "react";
import { RowBetween } from "../Row/Row";
import { Platform, StyleSheet } from "react-native";
import { theme } from "@utils";

interface CardProps extends IViewProps {
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  header?: React.ReactNode;
  subtitle?: string;
  bgColor?: ColorType;
  transparent?: boolean;
  leftTitleElement?: React.ReactNode;
  shadowed?: boolean;
}
const Card: React.FC<CardProps> = ({
  children,
  title,
  showTitle = true,
  bgColor,
  header,
  subtitle,
  transparent,
  leftTitleElement,
  shadowed = true,
  ...rest
}) => {
  return (
    <View
      style={{
        ...styles.card,
        shadowColor: shadowed ? theme.colors.lightBlue[800] : "transparent",
      }}
      {...rest}
    >
      {header}
      {showTitle && title && (
        <>
          {leftTitleElement ? (
            <RowBetween alignItems="center" mb={subtitle ? 1 : 5}>
              {leftTitleElement}
              <Text color="black" fontSize="xl">
                {title}
              </Text>
            </RowBetween>
          ) : (
            <Text color="black" fontSize="xl" mb={subtitle ? 1 : 5}>
              {title}
            </Text>
          )}
        </>
      )}
      {subtitle && (
        <Text color="text.main" fontSize="sm" mb={5}>
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 3,
    marginVertical: 3,
    backgroundColor: "#F4F6FC",

    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: Platform.OS === "web" ? 0.2 : 0.9,
    shadowRadius: Platform.OS === "web" ? 15 : 50,

    elevation: Platform.OS === "web" ? 2 : 5,
  },
});

export default Card;
