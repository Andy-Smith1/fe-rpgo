import React from "react";
import { Alert } from "react-native";

export const errorAlert = () => {
  Alert.alert("Oops!", "Something went wrong, try again.", [
    { text: "OK", style: "cancel" },
  ]);
};
