import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface ContainerProps {
  children: ReactNode; // children의 타입 정의
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});

export default Container;
