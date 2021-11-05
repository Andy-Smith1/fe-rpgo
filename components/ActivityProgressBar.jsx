import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";

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
        { text: "Complete", onPress: () => navigation.navigate("Map") },
      ]
    );
  };

  const endChallengeAlert = () => {
    Alert.alert(
      "Are you sure?",
      "You will lose your progress if you end this quest.",
      [
        { text: "Keep going", style: "cancel" },
        { text: "End", onPress: () => navigation.navigate("Map") },
      ]
    );
  };

  const timesUpAlert = () => {
    Alert.alert("Quest failed!", "You ran out of time!", [
      { text: "OK", onPress: () => navigation.navigate("Map") },
    ]);
  };

  if (!challengeComplete && activeChallenge.timed_challenge.timed) {
    if (progress.timeElapsed > activeChallenge.timed_challenge.time_limit) {
      timesUpAlert();
    }
  }

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
      <TouchableOpacity
        style={styles.stop}
        onPress={() => {
          challengeComplete
            ? navigation.navigate("Challenges")
            : endChallengeAlert();
        }}
      >
        <Text style={styles.text}>End Challenge</Text>
      </TouchableOpacity>
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
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
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
  stop: {
    backgroundColor: "#536b78",
    marginTop: 5,
    padding: 5,
  },
});
