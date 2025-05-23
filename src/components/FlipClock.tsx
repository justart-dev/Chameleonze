import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useStore from "../store/useStore";
import { RFPercentage } from "react-native-responsive-fontsize";

const formatNumber = (num: number) => num.toString().padStart(2, "0");

const FlipClock = () => {
  const [time, setTime] = useState(new Date());
  const { isExpanded } = useStore();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours24 = time.getHours();
  const hours = formatNumber(hours24 % 12 || 12); // 12시간 형식으로 변환
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const ampm = hours24 < 12 ? "AM" : "PM";

  return (
    <View style={styles.container}>
      <Text style={styles.ampm}>{ampm}</Text>
      <View style={styles.timeContainer}>
        <Text style={[styles.flip, isExpanded && styles.fullSizeFlip]}>
          {hours}
        </Text>
        <Text style={styles.colon}>:</Text>
        <Text style={[styles.flip, isExpanded && styles.fullSizeFlip]}>
          {minutes}
        </Text>
        <Text style={styles.colon}>:</Text>
        <Text style={[styles.flip, isExpanded && styles.fullSizeFlip]}>
          {seconds}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flip: {
    fontSize: 48,
    color: "white",
    fontFamily: "monospace",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    width: 80,
    textAlign: "center",
  },
  fullSizeFlip: {
    // Todo : app에서는 font size가 동적이지 않으므로 헬퍼함수를 이용하던가 라이브러리를 사용해야한다.
    // 나중에 디바이스 체크 할 것.
    width: 200,
    fontSize: RFPercentage(18),
  },
  colon: {
    fontSize: 48,
    color: "white",
    paddingHorizontal: 5,
  },
  ampm: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: 10,
  },
});

export default FlipClock;
