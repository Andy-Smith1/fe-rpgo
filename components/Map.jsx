import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,
  Image,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { mapStyle } from "../utils/map-style";

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
            <Image source={require("../assets/Art-Assets/Minotaur.gif")} />
          </MapView.Marker>
        </MapView>
      )}
      <Button
        style={styles.button}
        title="Challenges"
        onPress={() => navigation.navigate("Challenges")}
      />
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
  button: {
    flex: 1,
    height: 100,
  },
});
