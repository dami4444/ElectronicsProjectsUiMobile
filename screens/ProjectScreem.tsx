import { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import LogIn, { AuthProps } from "../components/LogIn";
import ProjectDetails from "../components/ProjectDetails";
import { ProjectData } from "../components/ProjectsList";
import { Text, View } from "../components/Themed";
import { RefetchProjectsProps } from "../navigation";
import { RootStackParamList, RootTabScreenProps } from "../types";

export default function ProjectScreen({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
  project,
  route,
}: AuthProps &
  RefetchProjectsProps & {
    project: ProjectData;
    route: RouteProp<RootStackParamList, "Szczegóły Projektu">;
  }) {
  const { projectId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły Projektu</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ProjectDetails
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        refetchProjects={refetchProjects}
        setRefetchProjects={setRefetchProjects}
        projectId={projectId}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
