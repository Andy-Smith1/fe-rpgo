import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useFonts } from "expo-font";

const ActivityProgressBar = ({ activeChallenge, progress, navigation }) => {
  const [challengeComplete, setChallengeComplete] = useState(false);

  const challengeCompleteAlert = () => {
    Alert.alert(
      "Quest Complete!",
      "Congratulations, would you like to select a new quest or continue tracking (no additional XP gained)?",
      [
        {
          text: "Keep Tracking",
          style: "cancel",
        },
        { text: "Complete", onPress: () => navigation.navigate("Challenges") },
      ]
    );
  };

  if (
    progress[activeChallenge.activity_type] >= activeChallenge.activity_value &&
    !challengeComplete
  ) {
    setChallengeComplete(true);
    challengeCompleteAlert();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeChallenge.title}</Text>
      <Text style={styles.text}>{activeChallenge.description}</Text>
      <Text style={styles.text}>
        {Math.floor(progress[activeChallenge.activity_type])}/
        {activeChallenge.activity_value}
      </Text>
    </View>
  );
};

export default ActivityProgressBar;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#7c98b3",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: 5,
    fontFamily: "GameFont",
    fontSize: 16,
  },
  title: {
    color: "white",
    textAlign: "center",

    fontFamily: "GameFont",
    fontSize: 24,
  },
});
