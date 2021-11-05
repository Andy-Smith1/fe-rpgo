import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useIsFocused } from "@react-navigation/native";
import ASSETS from "../utils/assets-object";

const UserMenu = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  console.log(user);

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
      <Text style={styles.menuTitle}>Menu </Text>
      <View style={styles.userInfoBox}>
        <View style={styles.userInfo}>
          <Text style={styles.smallDescription}>Tap sprite to customise</Text>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("Sprites");
          // }}
          >
            <Image source={ASSETS[user.sprite]} style={styles.menuSprite} />
          </TouchableOpacity>
          <Text style={styles.title}>{user.username}</Text>
        </View>
        <View style={styles.userStats}>
          <Text style={styles.level}>
            Level: {1 + Math.floor(user.xp / 1000)}
          </Text>
          <Text style={styles.description}>Current XP: {user.xp}</Text>
          <Text style={styles.description}>Steps: {user.total_steps}</Text>
          <Text style={styles.description}>
            Meters Climbed: {user.total_elevation_gain}
          </Text>
          <Text style={styles.description}>
            Distance Covered: {user.total_distance_covered}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.listItem}
        //   onPress={() => {
        //     navigation.navigate("Trophies",);
        //   }}
      >
        <Text style={styles.title}>Trophies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        //   onPress={() => {
        //     navigation.navigate("CompletedChallenges",);
        //   }}
      >
        <Text style={styles.title}>Completed Quests</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          setUser(null);
        }}
      >
        <Text style={styles.title}>Log Out</Text>
      </TouchableOpacity>
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
  menuTitle: {
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

export default UserMenu;