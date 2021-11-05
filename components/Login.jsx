import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext }from "react";
import { UserContext } from "../contexts/UserContext";



const Login = () => {

  const { user } = useContext(UserContext);
  
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="username" />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.title}>Log in!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#536b78",
  },
  loginButton: {
    padding: 20,
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
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: "bold",
    fontFamily: "GameFont",
  },
  description: {
    color: "white",
    fontFamily: "GameFont",
    fontSize: 18,
    color: "#cee5f2",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
});
