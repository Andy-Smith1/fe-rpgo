import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import ASSETS from "../utils/assets-object";

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={ASSETS["Title_BG"]} style={styles.background}>
        <Image source={ASSETS["RP_GO_title"]} style={styles.logo} />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.description}>Continue...</Text>
          <Text style={styles.subDescription}>(Login)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.description}>New Game</Text>
          <Text style={styles.subDescription}>(Register)</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",

    justifyContent: "center",
  },
  loginButton: {
    padding: 10,
    color: "white",
    margin: 10,
    fontFamily: "Game Font",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  logo: {
    width: Dimensions.get("window").width / 1.5,
    height: 80,
    alignSelf: "center",
    resizeMode: "contain",
    margin: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: "GameFont",
    textAlign: "center",
  },
  description: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 20,
    textAlign: "center",
  },
  subDescription: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 16,
    color: "#cee5f2",
    color: "#cee5f2",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    fontFamily: "GameFont",
    fontSize: 20,
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
