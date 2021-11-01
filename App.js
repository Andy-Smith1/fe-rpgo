import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Map from "./components/Map";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function App() {
    return (
        <View style={styles.container}>
            <Map />
        </View>
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
