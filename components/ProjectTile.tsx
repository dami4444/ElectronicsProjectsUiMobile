import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { RefetchProjectsProps } from "../navigation";
import { RootTabScreenProps } from "../types";
import DeleteProject from "./DeleteProject";
import { AuthProps } from "./LogIn";
import { ProjectData } from "./ProjectsList";

export default function ProjectTile({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
  project,
  navigation,
}: AuthProps &
  RefetchProjectsProps &
  RootTabScreenProps<"TabOne"> & { project: ProjectData }) {
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
          project={project}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          refetchProjects={refetchProjects}
          setRefetchProjects={setRefetchProjects}
        />

        <Button
          onPress={() => {
            setRefetchProjects(true);
            navigation.navigate("Szczegóły Projektu", {
              projectId: project.id,
            });
          }}
        >
          Zobacz więcej
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
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
