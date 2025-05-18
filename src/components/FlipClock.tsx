import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const formatNumber = (num: number) => num.toString().padStart(2, "0");

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours24 = time.getHours();
  const hours = formatNumber(hours24 % 12 || 12); // 12시간 형식으로 변환
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const ampm = hours24 < 12 ? "AM" : "PM"; // AM/PM 구분

  return (
    <View style={styles.container}>
      <Text style={styles.ampm}>{ampm}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.flip}>{hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.flip}>{minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.flip}>{seconds}</Text>
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
    alignItems: "center", // 수직 정렬
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
    width: 80, // 고정된 너비 설정
    textAlign: "center", // 텍스트 중앙 정렬
  },
  colon: {
    fontSize: 48,
    color: "white",
    paddingHorizontal: 5,
  },
  ampm: {
    fontSize: 24,
    color: "white",
    alignSelf: "center", // 수직 정렬
    marginRight: 10, // 약간의 여백 추가
  },
});

export default FlipClock;
