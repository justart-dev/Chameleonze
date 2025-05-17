import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import {
  Platform,
  Animated,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {
  TabBarVisibilityProvider,
  useTabBarVisibility,
} from "./TabBarVisibilityContext";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { showTabBar, resetHideTimer, translateY } = useTabBarVisibility();

  const handleTouch = () => {
    showTabBar();
    resetHideTimer();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          height: Platform.OS === "ios" ? 65 : 55,
          borderRadius: 30,
          backgroundColor: "#F5F5F5",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
          transform: [{ translateY }],
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            paddingBottom: Platform.OS === "ios" ? 15 : 5,
            paddingTop: 10,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {state.routes.map((route, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            let iconName: string | undefined = undefined;
            if (route.name === "Home") {
              iconName = "smileo";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
              showTabBar();
              resetHideTimer();
            };

            return (
              <TouchableWithoutFeedback key={route.key} onPress={onPress}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <AntDesign
                    name={iconName as any}
                    size={24}
                    color={isFocused ? "#4A4A4A" : "#9E9E9E"}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

function TabNavigatorContent() {
  const { showTabBar, resetHideTimer } = useTabBarVisibility();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          listeners={{
            tabPress: () => {
              return true;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={{
            tabPress: () => {
              return true;
            },
            focus: () => {
              showTabBar();
              resetHideTimer();
              return true;
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const TabNavigator = () => {
  return (
    <TabBarVisibilityProvider>
      <TabNavigatorContent />
    </TabBarVisibilityProvider>
  );
};

export default TabNavigator;
