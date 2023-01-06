import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import DeleteProject from "./DeleteProject";
import { AuthProps } from "./LogIn";
import { ProjectData } from "./ProjectsList";
import { MonoText } from "./StyledText";

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
    <Card style={[styles.projectsListItem]}>
      <Card.Content>
        <Text variant="titleMedium">{project.title}</Text>
        <View style={[styles.textLine]}>
          <Text variant="labelMedium">
            Autor: <Text variant="bodyMedium">{project.author}</Text>
          </Text>
          <Text variant="labelSmall">
            {project.is_diploma ? "Projekt dyplomowy" : ""}
          </Text>
        </View>

        <Text variant="labelMedium">
          Rok akademicki:{" "}
          <Text variant="bodyMedium">{project.academic_year}</Text>
        </Text>
        <Text variant="labelMedium">
          Kategoria: <Text variant="bodyMedium">{project.category}</Text>
        </Text>
      </Card.Content>
      <Card.Actions>
        <DeleteProject
          id={project.id}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          refetchProjects={refetchProjects}
          setRefetchProjects={setRefetchProjects}
        />

        <Button>Zobacz więcej</Button>
      </Card.Actions>
    </Card>
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
    marginVertical: 5,
    width: 300,
  },
  textLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
