import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import ASSETS from "../utils/assets-object";
import { removeUnderscoresAndHyphens } from "../utils/formatting";
import errorAlert from "../utils/error-alert";

const Register = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [sprite, setSprite] = useState("Minotaur");
  const [err, setErr] = useState("");
  const spritesArray = [
    "Chocobo",
    "Knight-1",
    "Knight-2",
    "Minotaur",
    "Reaper",
    "Strong-Knight",
    "Witch",
  ];

  const handleRegistration = async () => {
    setErr("");
    if (newPassword === confirmedPassword) {
      const result = await axios
        .post("https://rp-go.herokuapp.com/api/users/", {
          username: newUsername,
          password: newPassword,
          sprite: sprite,
          xp: 0,
          trophies: [],
          bio: "No bio",
          total_distance_covered: 0,
          total_steps: 0,
          total_elevation_gain: 0,
          current_challenge: { name: "no challenge selected" },
        })
        .catch(() => errorAlert());
      console.log(result.data);
      setNewUsername("");
      setNewPassword("");
      setConfirmedPassword("");

      navigation.navigate("Login");
    } else {
      setErr("Something went wrong");
      setNewUsername("");
      setNewPassword("");
      setConfirmedPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LandingPage");
        }}
        style={styles.backButton}
      >
        <Text style={styles.back}>&lt;</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.description}>
        {"<"} Choose a sprite! {">"}
      </Text>
      <View style={styles.spriteContainer}>
        <FlatList
          style={styles.spriteContainer}
          data={spritesArray}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={
                  item === sprite ? styles.currUserSprite : styles.spriteButton
                }
                onPress={() => {
                  setSprite(item);
                }}
              >
                <Image source={ASSETS[item]} style={styles.sprite} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
      {sprite && (
        <Text style={styles.description}>
          {removeUnderscoresAndHyphens(sprite)}
        </Text>
      )}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Choose a username..."
          onChangeText={setNewUsername}
          defaultValue={newUsername}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Choose a password..."
          onChangeText={setNewPassword}
          defaultValue={newPassword}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm password..."
          onChangeText={setConfirmedPassword}
          defaultValue={confirmedPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleRegistration(
              newUsername,
              newPassword,
              confirmedPassword,
              sprite
            );
          }}
        >
          <Text style={styles.description}>Register!</Text>
        </TouchableOpacity>

        <Text style={styles.description}>Already registered?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.description}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 2,
    zIndex: 2,
  },
  back: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 40,
    padding: 10,
  },
  button: {
    padding: 10,
    color: "white",
    margin: 12,
    fontFamily: "GameFont",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
    fontFamily: "GameFont",
    fontSize: 20,
  },
  sprite: {
    maxWidth: 100,
    maxHeight: 100,
    alignSelf: "center",
  },
  spriteButton: {
    justifyContent: "space-evenly",
    width: 103,
    height: 103,

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
  currUserSprite: {
    justifyContent: "space-evenly",
    width: 103,
    height: 103,
    color: "white",
    margin: 15,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#FFE95F",
    shadowColor: "yellow",
    shadowRadius: 15,
    shadowOpacity: 0.5,
  },
  spriteContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    width: Dimensions.get("window").width,
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
  },
});
