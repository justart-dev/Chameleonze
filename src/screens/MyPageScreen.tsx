import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTabBarVisibility } from "../navigation/TabBarVisibilityContext";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/common/Container";
import { Ionicons } from "@expo/vector-icons";

const MyPageScreen = () => {
  const { showTabBar, resetHideTimer } = useTabBarVisibility();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("chameleonze");

  const handleTouch = () => {
    showTabBar();
    resetHideTimer();
  };

  const handleContinue = () => {
    navigation.navigate("Home");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <Container>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Choose a look you like from the home screen
          </Text>
          <Text style={styles.subDescription}>
            In the quiet transitions, real rest begins.
          </Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "chameleonze"
                ? styles.selectedOption
                : styles.unselectedOption,
            ]}
            onPress={() => handleOptionSelect("chameleonze")}
            activeOpacity={1}
          >
            <View style={styles.textContainer}>
              <Ionicons
                name="color-palette"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Chameleonze</Text>
            </View>
            <Text style={styles.optionSubText}>
              As the hues change, may your thoughts find stillness.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === "flipClock"
                ? styles.selectedOption
                : styles.unselectedOption,
            ]}
            onPress={() => handleOptionSelect("flipClock")}
            activeOpacity={1}
          >
            <View style={styles.textContainer}>
              <Ionicons
                name="time"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Flip clock</Text>
            </View>
            <Text style={styles.optionSubText}>
              A classic clock that quietly marks the rhythm of your day.
            </Text>
          </TouchableOpacity>

          {/* 비활성화된 옵션 추가 */}
          <TouchableOpacity
            style={styles.disabledOptionButton}
            disabled={true} // 비활성화 상태
          >
            <View style={styles.textContainer}>
              <Ionicons
                name="information-circle" // 아이콘 변경
                size={24}
                color="#ccc" // 비활성화된 아이콘 색상
                style={styles.icon}
              />
              <Text style={styles.disabledOptionText}>Upcoming Feature</Text>
            </View>
            <Text style={styles.disabledOptionSubText}>
              This feature will allow you to customize your experience further.
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Go home</Text>
        </TouchableOpacity>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  subDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  optionContainer: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    elevation: 2,
  },
  selectedOption: {
    borderColor: "#000", // 선택된 옵션의 테두리 색상
    borderWidth: 2, // 테두리 두께
    backgroundColor: "#F5F5F5", // 배경색
  },
  unselectedOption: {
    borderColor: "#ccc", // 선택되지 않은 옵션의 테두리 색상
    borderWidth: 2, // 테두리 두께
    backgroundColor: "#F5F5F5", // 배경색
  },
  disabledOptionButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    borderColor: "#ccc", // 비활성화된 옵션의 테두리 색상
    borderWidth: 2, // 테두리 두께
  },
  disabledOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccc", // 비활성화된 텍스트 색상
  },
  disabledOptionSubText: {
    fontSize: 16,
    color: "#ccc", // 비활성화된 서브 텍스트 색상
    marginTop: 5,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionSubText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyPageScreen;
