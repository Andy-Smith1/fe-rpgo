import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";

const ActivityProgressBar = ({ activeChallenge, progress }) => {
  // if (
  //   progress[activeChallenge.challenge.activity_type] >=
  //   activeChallenge.challenge.activityValue
  // ) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Challenge Complete</Text>
  //     </View>
  //   );
  // }

  console.log(progress);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{activeChallenge.title}</Text>
      <Text style={styles.text}>{activeChallenge.description}</Text>
      <Text>
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
    backgroundColor: "#2892D7",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    padding: 5,
  },
});
