import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState} from "react";
import axios from "axios";
import ASSETS from "../utils/assets-object";

const Register = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBio, setNewBio] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [sprite, setSprite] = useState('Minotaur');
  const [err, setErr] = useState('');


  const handleRegistration = async () => {
    setErr('');
    if (newPassword === confirmedPassword) {
      const result = await axios.post('https://rp-go.herokuapp.com/api/users/', {
        username: newUsername,
        password: newPassword,
        sprite: sprite,
        xp: 0,
        trophies: [],
        bio: newBio,
        total_distance_covered: 0,
        total_steps: 0,
        total_elevation_gain: 0,
        current_challenge: {name: "no challenge selected"},
      })
      console.log(result.data);
      setNewUsername('');
      setNewPassword('');
      setConfirmedPassword('');
      setNewBio('')
      navigation.navigate('Login');
    } else {
      setErr('Something went wrong')
      setNewUsername("");
      setNewPassword("");
      setConfirmedPassword("");
      setNewBio("");
    }
  }
    
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.description}>Choose a sprite!</Text>
      {/* <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate("Sprites")
      // }}
      >
        <Image source={ASSETS[Minotaur]} style={styles.menuSprite} />
      </TouchableOpacity> */}

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
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Write a bio..."
        numberOfLines={4}
        onChangeText={setNewBio}
        defaultValue={newBio}
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
    </View>
  );

}
  export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
    padding: 20,
  },
  button: {
    padding: 10,
    color: "white",
    margin: 20,
    fontFamily: "Game Font",
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
  },
});
