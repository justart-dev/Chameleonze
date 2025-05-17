import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Pressable } from "react-native";

const ANIMATION_DURATION = 40000;

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

      // 채도(Saturation) 애니메이션: 60-80%
      Animated.sequence([
        Animated.timing(saturationAnim, {
          toValue: 80,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
        Animated.timing(saturationAnim, {
          toValue: 60,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
      ]).start();

      // 명도(Lightness) 애니메이션: 80-90%
      Animated.sequence([
        Animated.timing(lightnessAnim, {
          toValue: 90,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
        Animated.timing(lightnessAnim, {
          toValue: 80,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
      ]).start();
    };

    startAnimation();
  }, []);

  const backgroundColor = hueAnim.interpolate({
    inputRange: [0, 60, 120, 180, 240, 300, 360],
    outputRange: [
      "hsl(0, 70%, 85%)",
      "hsl(60, 70%, 85%)",
      "hsl(120, 70%, 85%)",
      "hsl(180, 70%, 85%)",
      "hsl(240, 70%, 85%)",
      "hsl(300, 70%, 85%)",
      "hsl(360, 70%, 85%)",
    ],
  });

  return (
    <Pressable
      style={[styles.container]}
      android_ripple={null}
      android_disableSound={true}
    >
      <Animated.View style={[styles.background, { backgroundColor }]} />
    </Pressable>
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
