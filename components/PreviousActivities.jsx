import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getActivitiesByUsername } from "../utils/api";
import { useIsFocused } from "@react-navigation/native";
import { msToTime } from "../utils/formatting";

const PreviousActivities = ({ navigation }) => {
  const [apiPreviousActivities, setApiPreviousActivities] = useState([]);
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getActivitiesByUsername(user.username).then((prevChallengesFromApi) => {
      setApiPreviousActivities(prevChallengesFromApi);
      console.log(user.username);
      console.log("refreshed");
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
      <Text style={styles.menuTitle}>Activities</Text>
      <FlatList
        data={apiPreviousActivities}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                navigation.navigate("PrevActivityMapped", item);
              }}
            >
              <Text style={styles.title}>{item.challenge_ID}</Text>
              <Text style={styles.description}>
                Date:
                {String(item.date).substring(0, 10)}
              </Text>
              <Text style={styles.description}>
                Time Taken:
                {msToTime(item.timeElapsed)}
              </Text>
              <Text style={styles.description}>
                Steps Taken: {item.stepCount}
              </Text>
              <Text style={styles.description}>
                Height Climbed: {item.metersClimbed.toFixed(2)}
              </Text>
              <Text style={styles.description}>
                Distance Travelled: {item.distanceTravelled}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default PreviousActivities;

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
  },
  title: {
    color: "white",
    fontSize: 24,
    paddingBottom: 10,

    fontFamily: "GameFont",
  },
  description: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 18,
    color: "#cee5f2",
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
