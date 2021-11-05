import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import ASSETS from "../utils/assets-object";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { mapStyle } from "../utils/map-style";
import { UserContext } from "../contexts/UserContext";

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let lastKnownLocation = await Location.getLastKnownPositionAsync({});
        setLocation({
          longitude: lastKnownLocation.coords.longitude,
          latitude: lastKnownLocation.coords.latitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        });
      } catch (err) {
        console.log(err);
      }

      let position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });
    })();
  }, []);

  setTimeout(async () => {
    let newPosition = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    setLocation({
      longitude: newPosition.coords.longitude,
      latitude: newPosition.coords.latitude,
      longitudeDelta: 0.0921,
      latitudeDelta: 0.0421,
    });
  }, 10000);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={location}
          provider={MapView.PROVIDER_GOOGLE}
        >
          {/* <Marker
            coordinate={location}
            image={require("../assets/Art-Assets/Minotaur.gif")}
            minDelta={0.5}
            maxDelta={2}
            style={{ height: 40, width: 40 }}
          /> */}

          <MapView.Marker coordinate={location} minDelta={0.5} maxDelta={2}>
            <Image source={ASSETS[user.user.sprite]} style={{ height: 80 }} />
          </MapView.Marker>
        </MapView>
      )}
      {/* <Button
        title="Challenges"
        onPress={() => navigation.navigate("Challenges")}
      /> */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("UserMenu")}
      >
        <Text style={styles.text}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.questButton}
        onPress={() => navigation.navigate("Challenges")}
      >
        <Text style={styles.text}>Quests</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  menuButton: {
    padding: 10,
    color: "white",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    width: "50%",
    position: "absolute",
    left: "25%",
    bottom: 80,
  },
  questButton: {
    padding: 10,
    color: "white",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    width: "50%",
    position: "absolute",
    left: "25%",
    bottom: 15,
  },
  text: {
    fontFamily: "GameFont",
    textAlign: "center",
    color: "white",
    fontSize: 24,
  },
});
