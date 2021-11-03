import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { withSafeAreaInsets } from "react-native-safe-area-context";

const Challenges = ({ navigation }) => {
  const [challenges, setChallenges] = useState(testChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setSelectedChallenge(item);
                navigation.navigate("ActiveChallengeMap", item);
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2892D7",
  },
  listItem: {
    padding: 20,
    color: "white",
    margin: 20,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
  },
  title: {
    color: "white",
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  description: {
    color: "white",
  },
});

const testChallenges = [
  {
    id: 1,
    title: "Run From the Dragon",
    description: "You are being chased by a dragon, cover 1000 steps to escape",
    reward: "blueTrophy.png",
    activity_type: "stepCount",
    timed_challenge: [true, new Date("December 17, 2021 03:24:00")],
    activity_value: 1000,
  },
  {
    id: 2,
    title: "Climb the Tower",
    description:
      "You find a deserted guard tower, gain 50 elevation to search it",
    reward: "redTrophy.png",
    activity_type: "metersClimbed",
    timed_challenge: [false, null],
    activity_value: 50,
  },
  {
    id: 3,
    title: "One does not simply...",
    description: "Cover 5km to enter a new area",
    reward: "theOneTrophy.png",
    activity_type: "distanceTravelled",
    timed_challenge: [false, null],
    activity_value: 5000,
  },
  {
    id: 4,
    title: "Help the Grey Mage",
    description: "Explore an area of 2km to find plants for a mage",
    reward: "greyTrophy.png",
    activity_type: "distanceTravelled",
    timed_challenge: [false, null],
    activity_value: 2000,
  },
  {
    id: 5,
    title: "Break the curse",
    description:
      "you've been cursed, walk a mile in someone else's shoes to break the curse",
    reward: "purpleMedal.png",
    activity_type: "distanceTravelled",
    timed_challenge: [false, null],
    activity_value: 1000,
  },
  {
    id: 6,
    title: "Break the curse",
    description:
      "you've been cursed, walk a mile in someone else's shoes to break the curse",
    reward: "purpleMedal.png",
    activity_type: "distanceTravelled",
    timed_challenge: [false, null],
    activity_value: 1000,
  },
  {
    id: 7,
    title: "Break the curse",
    description:
      "you've been cursed, walk a mile in someone else's shoes to break the curse",
    reward: "purpleMedal.png",
    activity_type: "distanceTravelled",
    timed_challenge: [false, null],
    activity_value: 1000,
  },
];
