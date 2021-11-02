import { View, StyleSheet, Dimensions, Text } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { mapStyle } from "../utils/map-style";

const Map = () => {
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
          longitudeDelta: 0.0922,
          latitudeDelta: 0.0421,
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
    <View>
      {location && (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={location}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <Marker coordinate={location} />
        </MapView>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
