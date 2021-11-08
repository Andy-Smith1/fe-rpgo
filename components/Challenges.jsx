import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getChallenges, getChallengesByUser } from "../utils/api";
import { useIsFocused } from "@react-navigation/native";
import ASSETS from "../utils/assets-object";
import { removeUnderscoresAndHyphens } from "../utils/formatting";

const Challenges = ({ navigation }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [apiChallenges, setApiChallenges] = useState([]);
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getChallengesByUser(user).then((challengesFromApi) => {
      if (Platform.OS === "ios") {
        setApiChallenges(challengesFromApi);
      } else {
        const removedStepChallenges = challengesFromApi.filter(
          (challenge) => challenge.activity_type !== "stepCount"
        );
        setApiChallenges(removedStepChallenges);
      }
    });
  }, [isFocused]);

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
      <Text style={styles.questTitle}>Quests </Text>

      <FlatList
        data={apiChallenges}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setSelectedChallenge(item);
                navigation.navigate("ActiveChallengeMap", item);
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.rewardsContainer}>
                <View style={styles.rewardsChild}>
                  <Text style={styles.title}>Reward:</Text>
                  <Image
                    source={ASSETS[item.reward]}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text style={styles.description}>
                    {removeUnderscoresAndHyphens(item.reward)}
                  </Text>
                </View>
                <View style={styles.rewardsChild}>
                  <Text style={styles.title}>XP:</Text>
                  <Text style={styles.title}>{item.xp}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Challenges;

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
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  rewardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  rewardsChild: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: 50,
  },
});
