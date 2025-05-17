import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useTabBarVisibility } from "../navigation/TabBarVisibilityContext";
import BackgroundColorTransition from "../components/BackgroundColorTransition";

const HomeScreen = () => {
  const { showTabBar, resetHideTimer } = useTabBarVisibility();

  const handleTouch = () => {
    showTabBar();
    resetHideTimer();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        <BackgroundColorTransition />
        <View style={styles.overlay}>
          <Text style={styles.text}>Noisli 스타일 배경화면</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
