import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { NavigationRouteContext } from "@react-navigation/native";

const Sprites = ({ navigation }) => {
//use trophies in user context to set sprites to unlocked or locked

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Map");
        }}
        style={styles.button}
      >
        <Text style={styles.back}>&lt;</Text>
      </TouchableOpacity>
      <Text style={styles.spritesTitle}>Sprites </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
  },
  userInfoBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    padding: 20,
    color: "white",
    margin: 20,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  menuSprite: {
    width: 120,
  },
  userStats: {
    marginLeft: 15,
  },
  listItem: {
    padding: 20,
    color: "white",
    margin: 20,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  title: {
    color: "white",
    fontSize: 24,
    paddingBottom: 10,

    textAlign: "center",
    fontFamily: "GameFont",
  },
  level: {
    fontFamily: "GameFont",
    fontSize: 20,
    color: "#F2F9FD",
  },
  smallDescription: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 12,
    color: "#cee5f2",
    textAlign: "center",
  },
  description: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 18,
    color: "#cee5f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  spritesTitle: {
    textAlign: "center",
    fontFamily: "GameFont",
    color: "white",
    fontSize: 40,
    padding: 10,
  },
  button: {
    position: "absolute",

    zIndex: 2,
  },
  back: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 40,
    padding: 10,
  },
});

export default Sprites;
