import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import DeleteProject from "./DeleteProject";
import { AuthProps } from "./LogIn";
import { ProjectData } from "./ProjectsList";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function ProjectTile({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
  project,
}: AuthProps & RefetchProjectsProps & { project: ProjectData }) {
  return (
    <>
      <MonoText style={[styles.projectsListItem]}>
        {`id: ${project.id}, author: ${project.author}, title: ${project.title}, file name: ${project.internal_filename} `}
      </MonoText>
      <DeleteProject
        id={project.id}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        refetchProjects={refetchProjects}
        setRefetchProjects={setRefetchProjects}
      />
    </>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  projectsList: {
    height: 400,
    display: "flex",
    flexDirection: "column",
  },
  projectsListItem: {
    paddingVertical: 5,
  },
});
