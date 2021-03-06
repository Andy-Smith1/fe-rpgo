import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import Map from "./components/Map";

import Login from "./components/Login";
import Trophies from "./components/Trophies";
import Register from "./components/Register";

import ActiveChallengeMap from "./components/ActiveChallengeMap";
import PreviousActivities from "./components/PreviousActivities";
import PrevActivityMapped from "./components/PrevActivityMapped";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Challenges from "./components/Challenges";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import { UserContext } from "./contexts/UserContext";
import { LogBox } from "react-native";
import UserMenu from "./components/UserMenu";
import UserMenuSprites from "./components/UserMenuSprites";
import LandingPage from "./components/LandingPage";
import FellowAdventurers from "./components/FellowAdventurers";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  //the below line will remove all warnings on the mobile app, will be handy when testing
  LogBox.ignoreAllLogs();

  let [fontsLoaded, error] = useFonts({
    GameFont: VT323_400Regular,
  });

  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar hidden={true} />
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LandingPage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen
              name="ActiveChallengeMap"
              component={ActiveChallengeMap}
            />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Challenges" component={Challenges} />
            <Stack.Screen name="UserMenu" component={UserMenu} />
            <Stack.Screen name="UserMenuSprites" component={UserMenuSprites} />
            <Stack.Screen name="Trophies" component={Trophies} />

            <Stack.Screen
              name="PreviousActivities"
              component={PreviousActivities}
            />
            <Stack.Screen
              name="PrevActivityMapped"
              component={PrevActivityMapped}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Login"
              component={Login}
              user={user}
              setUser={setUser}
            />
            <Stack.Screen
              name="FellowAdventurers"
              component={FellowAdventurers}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </>
  );
}
