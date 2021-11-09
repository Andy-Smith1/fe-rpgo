import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  View,
} from "react-native";
import { getAllUsers } from "../utils/api";
import ASSETS from "../utils/assets-object";

const FellowAdventurers = ({ navigation }) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getAllUsers().then((usersFromApi) => {
      setUsersList(usersFromApi);
    });
  }, []);

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
      <Text style={styles.questTitle}>Fellow Adventurers </Text>
      <FlatList
        data={usersList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.listItem}>
              <View>
                <Text style={styles.title}>{item.username}</Text>
                <Image
                  source={ASSETS[item.sprite]}
                  style={{ alignSelf: "center" }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "GameFont",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Level: {1 + Math.floor(item.xp / 1000)}
                </Text>
                <Text style={styles.description}>Current XP: {item.xp}</Text>
                {Platform.OS === "ios" && (
                  <Text style={styles.description}>
                    Steps: {item.total_steps}
                  </Text>
                )}
                <Text style={styles.description}>
                  Meters Climbed: {item.total_elevation_gain}
                </Text>
                <Text style={styles.description}>
                  Distance Covered: {item.total_distance_covered}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default FellowAdventurers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
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
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  questTitle: {
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
  title: {
    color: "white",
    fontSize: 24,
    paddingBottom: 10,
    textAlign: "center",
    fontFamily: "GameFont",
  },
  description: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 18,
    color: "#cee5f2",
  },
});
