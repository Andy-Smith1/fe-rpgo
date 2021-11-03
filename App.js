import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "./components/Map";
import ActiveChallengeMap from "./components/ActiveChallengeMap";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Challenges from "./components/Challenges";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="ActiveChallengeMap"
          component={ActiveChallengeMap}
        />
        <Stack.Screen name="Challenges" component={Challenges} />
      </Stack.Navigator>
    </NavigationContainer>
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
