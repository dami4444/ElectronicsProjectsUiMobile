import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import LogIn, { AuthProps } from "../components/LogIn";
import { Text, View } from "../components/Themed";

export default function ModalScreen({
  setUsername,
  setPassword,
  username,
  password,
}: AuthProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <LogIn
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    marginLeft: "10%",
  },
});
