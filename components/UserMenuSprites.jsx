import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import ASSETS from "../utils/assets-object";

import { NavigationRouteContext } from "@react-navigation/native";
import { getUser } from "../utils/api";
import { isLoading } from "expo-font";

const UserMenuSprites = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [currSprite, setCurrSprite] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    setIsLoading;
    getUser(user.user.username)
      .then((response) => {
        setCurrSprite(response.sprite);
      })
      .catch(() => {
        errorAlert();
        navigation.goBack();
      });
  }, [isFocused]);

  const handleSpritePress = async (sprite) => {
    const result = await axios.patch(
      `https://rp-go.herokuapp.com/api/users/${user.user.username}`,
      {
        property_to_change: "sprite",
        new_sprite: sprite,
      }
    );
    setCurrSprite(result.data.user.sprite);
    navigation.navigate("UserMenu");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UserMenu");
        }}
        style={styles.button}
      >
        <Text style={styles.back}>&lt;</Text>
      </TouchableOpacity>
      <Text style={styles.spritesTitle}>Sprites </Text>
      <FlatList
        horizontal={false}
        numColumns={2}
        style={styles.spriteList}
        data={spritesArray}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={
                item === currSprite
                  ? styles.currUserSprite
                  : styles.spriteButton
              }
              onPress={() => {
                handleSpritePress(item);
              }}
            >
              <Image source={ASSETS[item]} style={styles.sprite} />
              <Text
                style={item === currSprite ? styles.selectedText : styles.text}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
  },
  spriteList: {
    alignSelf: "center",
    padding: 20,
  },
  sprite: {
    maxWidth: 150,
    minHeight: 110,
    minWidth: 80,
    maxHeight: 150,
    alignSelf: "center",
  },
  spriteButton: {
    justifyContent: "space-evenly",
    width: 153,
    height: 153,
    color: "white",
    margin: 15,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  currUserSprite: {
    justifyContent: "space-evenly",
    width: 153,
    height: 153,
    color: "white",
    margin: 15,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#FFE95F",
    shadowColor: "yellow",
    shadowRadius: 20,
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
  text: {
    fontFamily: "GameFont",
    fontSize: 18,
    color: "#cee5f2",
    textAlign: "center",
  },
  selectedText: {
    fontFamily: "GameFont",
    fontSize: 18,
    color: "#536b78",
    textAlign: "center",
  },
});

export default UserMenuSprites;
