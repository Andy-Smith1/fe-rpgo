import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import ASSETS from "../utils/assets-object";

import { NavigationRouteContext } from "@react-navigation/native";

const UserMenuSprites = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  //use trophies in user context to set sprites to unlocked or locked

  const spritesArray = [
    "Chocobo",
    "Knight-1",
    "Knight-2",
    "Minotaur",
    "Reaper",
    "Strong-Knight",
    "Witch",
  ];
  // console.log(user.user.username);
  const handleSpritePress = async (sprite) => {
    console.log(sprite);
    console.log(user.user.username);
    const result = await axios.patch(
      `https://rp-go.herokuapp.com/api/users/${user.user.username}`,
      { property_to_change: "sprite", new_sprite: sprite }
    );
    console.log(result.data);
  };

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
      <ScrollView style={styles.spriteList}>
        <FlatList
          data={spritesArray}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.spriteButton}
                // style={ item === user.sprite && styles.selectedSprite}
                onPress={() => {
                  handleSpritePress(item);
                }}
              >
                <Image source={ASSETS[item]} style={styles.sprite} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
  },
  spriteList: {
    // justifyContent: "space-evenly",
    // backgroundColor: "green",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 500,
    // flex: 1,
  },
  sprite: {
    maxWidth: 100,
    maxHeight: 100,
    alignSelf: "center",
    // padding:3,
  },
  spriteButton: {
    justifyContent: "space-evenly",
    width: 103,
    height: 103,
    // padding: 20,
    color: "white",
    margin: 10,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
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

export default UserMenuSprites;
