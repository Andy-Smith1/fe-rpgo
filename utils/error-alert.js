import React from "react";
import { Alert } from "react-native";

const errorAlert = () => {
  Alert.alert("Oops!", "Something went wrong, try again.", [
    { text: "OK", style: "cancel" },
  ]);
};

export default errorAlert;
