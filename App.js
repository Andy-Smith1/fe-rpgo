import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Map from "./components/Map";
import MapView, { Marker, Polyline } from "react-native-maps";
import ActiveChallengeMap from "./components/ActiveChallengeMap";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Map /> */}
      <ActiveChallengeMap />
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
});
