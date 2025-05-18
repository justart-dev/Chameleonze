import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useTabBarVisibility } from "../contexts/TabBarVisibilityContext";
import BackgroundColorTransition from "../components/BackgroundColorTransition";
import useStore from "../store/useStore";
import FlipClock from "../components/FlipClock";
import * as ScreenOrientation from "expo-screen-orientation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DISPLAY } from "../constants/display";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const { showTabBar, resetHideTimer } = useTabBarVisibility();
  const { selectedOption, isExpanded, setExpanded } = useStore();
  const [isPortrait, setIsPortrait] = useState(true);
  const [showOrientationIcons, setShowOrientationIcons] = useState(false);
  const [iconAnimation] = useState(new Animated.Value(0));

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
        setIsPortrait(true);
      };

      lockOrientation();

      // 페이지가 포커스될 때 isZoomed 상태 초기화
      setExpanded(false);

      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [setExpanded])
  );

  const setPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    setIsPortrait(true);
    setExpanded(!isExpanded);
  };

  const setLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
    setIsPortrait(false);
    setExpanded(!isExpanded);
  };

  const handleTouch = () => {
    showTabBar();
    resetHideTimer();
    setShowOrientationIcons(true);

    Animated.timing(iconAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(iconAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowOrientationIcons(false));
    }, DISPLAY.DISPLAY_TIME);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        {selectedOption === "chameleonze" && <BackgroundColorTransition />}

        <View style={styles.overlay}>
          {selectedOption === "chameleonze" && (
            <Text style={styles.text}>Chameleonze.</Text>
          )}
          {selectedOption === "flipClock" && (
            <View style={styles.clockContainer}>
              <FlipClock />
            </View>
          )}
        </View>

        {showOrientationIcons && (
          <Animated.View
            style={[
              styles.topRightContainer,
              {
                opacity: iconAnimation,
                transform: [
                  {
                    translateX: iconAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableWithoutFeedback
              onPress={isPortrait ? setLandscape : setPortrait}
            >
              <View style={styles.iconButton}>
                <MaterialCommunityIcons
                  name={
                    isPortrait
                      ? "phone-rotate-landscape"
                      : "phone-rotate-portrait"
                  }
                  size={32}
                  color="black"
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
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
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  topRightContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 2,
  },
  iconButton: {
    backgroundColor: "white",
    padding: 10,
    margin: 4,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  clockContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
  },
});

export default HomeScreen;
