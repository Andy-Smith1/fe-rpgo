import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const LoadingAnimation = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require(`../assets/Art-Assets/Minotaur/Minotaur(Loading).gif`)}
        style={{ height: 120 }}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#536b78",
  },
  text: {
    padding: 10,
    color: "white",
    fontSize: 24,
    fontFamily: "GameFont",
  },
});
