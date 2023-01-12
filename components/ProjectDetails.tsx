import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  ProgressBar,
  Text,
  Tooltip,
} from "react-native-paper";
import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import { RootTabScreenProps } from "../types";
import DeleteProject from "./DeleteProject";
import { AuthProps } from "./LogIn";
import { ProjectData } from "./ProjectsList";
import { MonoText } from "./StyledText";
import * as FileSystem from "expo-file-system";
import { axiosBaseUrl } from "../constants/AxiosBaseUrl";

export default function ProjectTile({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
  projectId,
}: AuthProps & RefetchProjectsProps & { projectId: number }) {
  const [project, setProject] = useState<ProjectData | undefined>(undefined);
  const [file, setFile] = useState<any>(undefined);

  const findProject = (projects: ProjectData[]) =>
    projects.find((project) => projectId === project.id);

  useEffect(() => {
    if (refetchProjects) {
      axios
        .get<ProjectData[]>(axiosBaseUrl + "projects")
        .then(function (response) {
          setProject(findProject(response.data));
          setRefetchProjects(false);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(axiosBaseUrl + `file/${projectId}`)
        .then(function (response) {
          setFile(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [refetchProjects]);

  console.log("project", project, projectId, "file", file);

  const openFile = async () => {
    await Linking.openURL(axiosBaseUrl + `file/${projectId}`);
  };

  const buttonRef = useRef<View | null>(null);

  console.log("buttonRef", buttonRef);

  if (refetchProjects) {
    return <ActivityIndicator animating={true} />;
  }

  if (!project) {
    return (
      <Card style={[styles.projectsListItem]}>
        <Card.Content>
          <Text variant="titleMedium">
            Projekt o id {projectId} nie występuje w bazie danych.
          </Text>
        </Card.Content>
      </Card>
    );
  }

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
        <Text variant="labelMedium">
          Nazwa pliku:{" "}
          <Text variant="bodyMedium">{project.internal_filename}</Text>
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
        {file ? (
          <Button onPress={() => openFile()}>Otwórz plik</Button>
        ) : (
          <Tooltip
            enterTouchDelay={150}
            leaveTouchDelay={3000}
            title="Błąd - pliku nie ma w bazie danych"
          >
            <TouchableOpacity>
              <Button disabled onPress={() => openFile()}>
                Otwórz plik
              </Button>
            </TouchableOpacity>
          </Tooltip>
        )}
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
    width: "80%",
    marginLeft: "10%",
  },
  textLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
