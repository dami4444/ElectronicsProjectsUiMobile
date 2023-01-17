import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
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
import { useToast } from "react-native-paper-toast";

export default function ProjectDetails({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
  projectId,
  navigation,
}: AuthProps & RefetchProjectsProps & { projectId: number; navigation: any }) {
  const [project, setProject] = useState<ProjectData | undefined>(undefined);
  const [file, setFile] = useState<any>(undefined);

  const toaster = useToast();

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
          toaster.show({
            message: error.message || "Bład podczas danych projektu.",
            type: "error",
          });
        });
    }
  }, [refetchProjects]);

  useEffect(() => {
    if (project?.id) {
      axios
        .get(axiosBaseUrl + `file/${projectId}`)
        .then(function (response) {
          setFile(response.data);
        })
        .catch(function (error) {
          toaster.show({
            message: error.message || "Bład pobierania pliku projektu.",
            type: "error",
          });
        });
    }
  }, [project?.id]);

  const openFile = async () => {
    await Linking.openURL(axiosBaseUrl + `file/${projectId}`);
  };

  if (refetchProjects) {
    return <ActivityIndicator animating={true} />;
  }

  if (!project) {
    return (
      <Card style={[styles.projectsListItem]}>
        <Card.Content>
          <Text variant="titleLarge">
            Projekt o id {projectId} nie występuje w bazie danych.
          </Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={[styles.projectsListItem]}>
      <Card.Content>
        <Text style={styles.textLine} variant="titleLarge">
          {project.title}
        </Text>

        <Text style={styles.textLine} variant="labelLarge">
          Autor: <Text variant="bodyLarge">{project.author}</Text>
        </Text>

        <Text style={styles.textLine} variant="labelLarge">
          Rok akademicki:{" "}
          <Text variant="bodyLarge">{project.academic_year}</Text>
        </Text>
        <Text style={styles.textLine} variant="labelLarge">
          Kategoria: <Text variant="bodyLarge">{project.category}</Text>
        </Text>
        <Text style={styles.textLine} variant="labelLarge">
          Projekt dyplomowy:{" "}
          <Text variant="bodyLarge">{project.is_diploma ? "Tak" : "Nie"}</Text>
        </Text>
        <Text style={styles.textLine} variant="labelLarge">
          Nazwa pliku:{" "}
          <Text variant="bodyLarge">{project.internal_filename}</Text>
        </Text>

        <Text variant="labelSmall">
          {project.is_diploma ? "Projekt dyplomowy" : ""}
        </Text>
      </Card.Content>
      <Card.Actions>
        <DeleteProject
          isInProjectDetails
          navigation={navigation}
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
    margin: 2,
  },
});
