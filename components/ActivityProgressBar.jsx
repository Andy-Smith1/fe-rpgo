import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import {
  addTrophyToUser,
  patchActivity,
  patchUserXP,
  postActivity,
} from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import errorAlert from "../utils/error-alert";

const ActivityProgressBar = ({ activeChallenge, progress, navigation }) => {
  const [challengeComplete, setChallengeComplete] = useState(false);
  const { user } = useContext(UserContext);
  const [completedChallengeID, setCompletedChallengeID] = useState(null);

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
    addTrophyToUser(user.user.username, activeChallenge.reward);
    postActivity({
      username: user.user.username,
      distanceTravelled: progress.distanceTravelled,
      metersClimbed: progress.metersClimbed,
      stepCount: progress.stepCount,
      timeElapsed: progress.timeElapsed,
      activityType: activeChallenge.activity_type,
      challengeTitle: activeChallenge.title,
      polylineArray: progress.polylineArray,
    })
      .then((postedActivity) => {
        setCompletedChallengeID(postedActivity._id);
      })
      .catch((err) => {
        errorAlert();
        navigation.navigate("Map");
      });
    patchUserXP(user.user.username, activeChallenge.xp)
      .then(() => {})
      .catch((err) => {
        errorAlert;
        navigation.navigate("Map");
      });
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
          if (challengeComplete) {
            patchActivity({
              distanceTravelled: progress.distanceTravelled,
              metersClimbed: progress.metersClimbed,
              stepCount: progress.stepCount,
              timeElapsed: progress.timeElapsed,
              activityID: completedChallengeID,
            }).then((response) => {
              navigation.navigate("Map");
            });
          } else {
            endChallengeAlert();
          }
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
