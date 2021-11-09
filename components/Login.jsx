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

const Login = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [err, setErr] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    setErr("");
    const result = await axios.get(
      `https://rp-go.herokuapp.com/api/users/${newUsername}`
    );
    if (result.data.user.password === newPassword) {
      setUser(result.data);
      setNewUsername("");
      setNewPassword("");
      navigation.navigate("Map");
    } else {
      setErr("Username or password is invalid, please try again");
      setNewUsername("");
      setNewPassword("");
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
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={setNewUsername}
        defaultValue={newUsername}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={setNewPassword}
        defaultValue={newPassword}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          handleLogin(newUsername, newPassword);
        }}
      >
        <Text style={styles.description}>Log in!</Text>
      </TouchableOpacity>

      <Text style={styles.description}>Create a new user...</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.description}>Register!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top:2,
    zIndex: 2,
  },
  back: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 40,
    padding: 10,
  },
  loginButton: {
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
    fontFamily: "GameFont",
    fontSize: 20,
  },
});
