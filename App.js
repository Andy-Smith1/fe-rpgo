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
  // const [activeChallenge, setActiveChallenge] = useState({
  //   active: true,
  //   challenge: {
  //     title: "Climb the tower.",
  //     activity_type: "metersClimbed",
  //     activityValue: 20,
  //   },
  //   data: {},
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{ headerShown: false }}
      >
        {/* <View style={styles.container}> */}
        {/* <StatusBar hidden={true} /> */}
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="ActiveChallengeMap"
          component={ActiveChallengeMap}
        />
        <Stack.Screen name="Challenges" component={Challenges} />
        {/* <Map /> */}
        {/* <ActiveChallengeMap
        setActiveChallenge={setActiveChallenge}
        activeChallenge={activeChallenge}
        /> */}
        {/* </View> */}
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
