import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import ASSETS from "../utils/assets-object";
import { UserContext } from "../contexts/UserContext";
import { removeUnderscoresAndHyphens } from "../utils/formatting";
import { getUser } from "../utils/api";
import LoadingAnimation from "./LoadingAnimation";

const Trophies = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [userTrophies, setUserTrophies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(user.user.username).then((response) => {
      setUserTrophies(response.trophies);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trophies</Text>
      <FlatList
        data={userTrophies}
        style={styles.trophyList}
        numColumns={2}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Image
                source={ASSETS[item]}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.description}>
                {removeUnderscoresAndHyphens(item)}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Map");
        }}
      >
        <Text style={styles.description}>Menu...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Trophies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
    padding: 20,
  },
  trophyList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
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
    fontSize: 18,
    color: "#cee5f2",
    textAlign: "center",
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
    textAlign: "center",
    maxWidth: 125,
  },
  image: {
    height: 50,
  },
  button: {
    padding: 10,
    color: "white",
    margin: 20,
    fontFamily: "GameFont",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#7c98b3",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
});
