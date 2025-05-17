import React, { createContext, useContext, useRef } from "react";
import { Animated, Easing } from "react-native";

interface TabBarVisibilityContextProps {
  showTabBar: () => void;
  hideTabBar: () => void;
  resetHideTimer: () => void;
  translateY: Animated.Value;
}

const TabBarVisibilityContext = createContext<
  TabBarVisibilityContextProps | undefined
>(undefined);

export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (!context) {
    throw new Error(
      "useTabBarVisibility must be used within a TabBarVisibilityProvider"
    );
  }
  return context;
};

export const TabBarVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const translateY = useRef(new Animated.Value(200)).current;
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const showTabBar = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 30,
      friction: 8,
    }).start();
  };

  const hideTabBar = () => {
    Animated.timing(translateY, {
      toValue: 200,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const resetHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      hideTabBar();
    }, 3000);
  };

  return (
    <TabBarVisibilityContext.Provider
      value={{ showTabBar, hideTabBar, resetHideTimer, translateY }}
    >
      {children}
    </TabBarVisibilityContext.Provider>
  );
};
