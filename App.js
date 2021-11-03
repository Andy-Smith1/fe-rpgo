import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Map from "./components/Map";
import ActiveChallengeMap from "./components/ActiveChallengeMap";

export default function App() {
  const [activeChallenge, setActiveChallenge] = useState({
    active: true,
    challenge: {
      title: "Climb the tower.",
      activity_type: "metersClimbed",
      activityValue: 20,
    },
    data: {},
  });
  return (
    <View style={styles.container}>
      <StatusBar style={styles.statusBar} hidden={true} />
      {/* <Map /> */}
      <ActiveChallengeMap
        setActiveChallenge={setActiveChallenge}
        activeChallenge={activeChallenge}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: "red",
  },
});
