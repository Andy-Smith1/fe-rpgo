import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import Map from "./components/Map";
import Login from "./components/Login"
import ActiveChallengeMap from "./components/ActiveChallengeMap";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Challenges from "./components/Challenges";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import { UserContext } from "./contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({ name: "Andy" });

  let [fontsLoaded, error] = useFonts({
    GameFont: VT323_400Regular,
  });

  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar hidden={true} />
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="ActiveChallengeMap"
            component={ActiveChallengeMap}
          />
          <Stack.Screen name="Challenges" component={Challenges} />
          <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
=======
      <UserContext.Provider value={{ user, setUser }}>
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
      </UserContext.Provider>
>>>>>>> main
    </>
  );
}
