import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";

const ActivityProgressBar = ({ activeChallenge, progress }) => {
  if (
    progress[activeChallenge.challenge.activity_type] >=
    activeChallenge.challenge.activityValue
  ) {
    return (
      <View style={styles.container}>
        <Text>Challenge Complete</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{activeChallenge.challenge.title}</Text>
      <Text>
        {Math.floor(progress[activeChallenge.challenge.activity_type])}/
        {activeChallenge.challenge.activityValue}
      </Text>
    </View>
  );
};

export default ActivityProgressBar;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#2892D7",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
