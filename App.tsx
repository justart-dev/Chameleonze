import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundColorTransition from "./src/components/BackgroundColorTransition";

export default function App() {
  return (
    <View style={styles.container}>
      <BackgroundColorTransition />
      <View style={styles.overlay}>
        <Text style={styles.text}>Noisli 스타일 배경화면</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
