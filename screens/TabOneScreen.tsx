import React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { AuthProps } from "../components/LogIn";
import ProjectsList from "../components/ProjectsList";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
  setUsername,
  setPassword,
  username,
  password,
}: RootTabScreenProps<"TabOne"> & AuthProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista Projektów</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ProjectsList
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
