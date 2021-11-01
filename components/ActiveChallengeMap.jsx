import { View, StyleSheet, Dimensions, Text } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { mapStyle } from "../utils/map-style";

const ActiveChallengeMap = () => {
  const [location, setLocation] = useState(null);
  const [polylineArray, setPolylineArray] = useState([]);
  const [metersClimbed, setMetersClimbed] = useState(0);
  const [prevElevation, setPrevElevation] = useState(0);

  useEffect(() => {
    (async () => {
      let position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setPrevElevation(position.coords.altitude);

      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });
    })();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      let newPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      if (prevElevation !== 0 && newPosition.coords.altitude > prevElevation) {
        setMetersClimbed(
          (currMeters) =>
            currMeters + (newPosition.coords.altitude - prevElevation)
        );
      }
      setPrevElevation(newPosition.coords.altitude);

      setPolylineArray((currArr) => {
        return [
          ...currArr,
          {
            longitude: newPosition.coords.longitude,
            latitude: newPosition.coords.latitude,
            timeStamp: newPosition.timestamp,
          },
        ];
      });
    }, 5000);
  }, [polylineArray]);

  console.log(metersClimbed);

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
          <Polyline
            coordinates={polylineArray}
            strokeColor="red"
            strokeWidth={6}
            lineDashPattern={[1]}
          />
        </MapView>
      )}
    </View>
  );
};

export default ActiveChallengeMap;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
