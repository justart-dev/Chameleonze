import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const ANIMATION_DURATION = 60000;

const BackgroundColorTransition = () => {
  const hueAnim = useRef(new Animated.Value(0)).current;
  const saturationAnim = useRef(new Animated.Value(70)).current;
  const lightnessAnim = useRef(new Animated.Value(85)).current;

  useEffect(() => {
    const startAnimation = () => {
      // 색상(Hue) 애니메이션: 0-360도
      Animated.timing(hueAnim, {
        toValue: 360,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start(() => {
        hueAnim.setValue(0);
        startAnimation();
      });

      // 채도(Saturation) 애니메이션: 50-90%
      Animated.sequence([
        Animated.timing(saturationAnim, {
          toValue: 90,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
        Animated.timing(saturationAnim, {
          toValue: 50,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
      ]).start();

      // 명도(Lightness) 애니메이션: 75-95%
      Animated.sequence([
        Animated.timing(lightnessAnim, {
          toValue: 95,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
        Animated.timing(lightnessAnim, {
          toValue: 75,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
      ]).start();
    };

    startAnimation();
  }, []);

  const backgroundColor = hueAnim.interpolate({
    inputRange: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
    outputRange: [
      "hsl(0, 70%, 85%)",
      "hsl(30, 70%, 85%)",
      "hsl(60, 70%, 85%)",
      "hsl(90, 70%, 85%)",
      "hsl(120, 70%, 85%)",
      "hsl(150, 70%, 85%)",
      "hsl(180, 70%, 85%)",
      "hsl(210, 70%, 85%)",
      "hsl(240, 70%, 85%)",
      "hsl(270, 70%, 85%)",
      "hsl(300, 70%, 85%)",
      "hsl(330, 70%, 85%)",
      "hsl(360, 70%, 85%)",
    ],
  });

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.background, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default BackgroundColorTransition;
