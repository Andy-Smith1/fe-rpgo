import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useState, useEffect, useContext } from "react";
import { mapStyle } from "../utils/map-style";
import { UserContext } from "../contexts/UserContext";

const PrevActivityMapped = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(null);

  const { polylineArray } = route.params;

  return (
    <View>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          longitude: polylineArray[0].longitude,
          latitude: polylineArray[0].latitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        provider={MapView.PROVIDER_GOOGLE}
      >
        {/* <MapView.Marker coordinate={location} minDelta={0.5} maxDelta={2}>
            <Image source={require("../assets/Art-Assets/Reaper/Reaper.gif")} />
          </MapView.Marker> */}

        <Polyline
          coordinates={polylineArray}
          strokeColor="red"
          strokeWidth={6}
          lineDashPattern={[1]}
        />
      </MapView>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          navigation.navigate("PreviousActivities");
        }}
      >
        <Text style={styles.text}>Return to Activities</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrevActivityMapped;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  listItem: {
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
