import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useTabBarVisibility } from "../navigation/TabBarVisibilityContext";
import BackgroundColorTransition from "../components/BackgroundColorTransition";
import useStore from "../store/useStore";
import FlipClock from "../components/FlipClock";

const HomeScreen = () => {
  const { showTabBar, resetHideTimer } = useTabBarVisibility();
  const { selectedOption } = useStore();

  const handleTouch = () => {
    showTabBar();
    resetHideTimer();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        {selectedOption === "chameleonze" && <BackgroundColorTransition />}

        <View style={styles.overlay}>
          {selectedOption === "chameleonze" && (
            <Text style={styles.text}>Noisli 스타일 배경화면</Text>
          )}
          {selectedOption === "flipClock" && <FlipClock />}
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
