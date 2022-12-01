import React from "react";
import { StyleSheet } from "react-native";
import AddProject from "../components/AddProject";

import EditScreenInfo from "../components/EditScreenInfo";
import { AuthProps } from "../components/LogIn";
import { Text, View } from "../components/Themed";
import { RefetchProjectsProps } from "../navigation";

export default function TabTwoScreen({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
}: AuthProps & RefetchProjectsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj Projekt</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <AddProject
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        refetchProjects={refetchProjects}
        setRefetchProjects={setRefetchProjects}
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
