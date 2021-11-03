import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  Button,
} from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { mapStyle } from "../utils/map-style";
import { getDistance, getPreciseDistance } from "geolib";
import { Pedometer } from "expo-sensors";
import { msToTime } from "../utils/formatting";

const ActiveChallengeMap = () => {
  const [location, setLocation] = useState(null);
  const [polylineArray, setPolylineArray] = useState([]);
  const [metersClimbed, setMetersClimbed] = useState(0);
  const [prevElevation, setPrevElevation] = useState(0);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevCoords, setPrevCoords] = useState({});
  const [stepCount, setStepCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [result, setResult] = useState({});
  // const [locationArray, setLocationArray] = useState([]);

  useEffect(() => {
    Pedometer.requestPermissionsAsync();
  }, []);

  if (Platform.OS === "ios") {
    Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setPrevElevation(position.coords.altitude);

      setPrevCoords({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });

      setStartTime(position.timestamp);

      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });

      // setLocationArray((currArray) => {
      //   const obj = { ...position };
      //   obj.initial = "INITIAL";
      //   return [...currArray, obj];
      // });
    })();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      let newPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setLocation({
        longitude: newPosition.coords.longitude,
        latitude: newPosition.coords.latitude,
        altitude: newPosition.coords.altitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });

      if (prevElevation !== 0 && newPosition.coords.altitude > prevElevation) {
        setMetersClimbed(
          (currMeters) =>
            currMeters + (newPosition.coords.altitude - prevElevation)
        );
      }

      setPrevElevation(newPosition.coords.altitude);

      if (prevCoords.longitude) {
        const calculatedDistance = getPreciseDistance(prevCoords, {
          longitude: newPosition.coords.longitude,
          latitude: newPosition.coords.latitude,
        });
        setDistanceTravelled((currDist) => {
          return currDist + calculatedDistance;
        });
      }
      setPrevCoords({
        longitude: newPosition.coords.longitude,
        latitude: newPosition.coords.latitude,
      });

      if (startTime !== 0) {
        setTimeElapsed(newPosition.timestamp - startTime);
      }
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

      // setLocationArray((currArray) => {
      //   return [...currArray, newPosition];
      // });
    }, 5000);
  }, [polylineArray]);

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
      <Button
        onPress={() => {
          setResult({
            metersClimbed,
            distanceTravelled,
            stepCount,
            timeElapsed: msToTime(timeElapsed),
            polylineArray,
          });
          console.log(result);
        }}
        title="the deets"
        style={styles.button}
      />
    </View>
  );
};

export default ActiveChallengeMap;

const styles = StyleSheet.create({
  map: {
    flex: 3,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    flex: 1,
    height: 200,
  },
});
