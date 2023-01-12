import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Portal } from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import { axiosBaseUrl } from "../constants/AxiosBaseUrl";

import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import { RootTabScreenProps } from "../types";
import { AuthProps } from "./LogIn";
import ProjectTile from "./ProjectTile";
import { Text, View } from "./Themed";

export type ProjectData = {
  id: number;
  academic_year: number;
  author: string;
  category: string;
  files_link: string;
  internal_filename: string;
  is_diploma: boolean;
  title: string;
};

export default function ProjectsList({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
  navigation,
}: AuthProps & RefetchProjectsProps & RootTabScreenProps<"TabOne">) {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const toaster = useToast();

  useEffect(() => {
    if (refetchProjects) {
      axios
        .get<ProjectData[]>(axiosBaseUrl + "projects")
        .then(function (response) {
          setProjects(response.data);
          setRefetchProjects(false);
        })
        .catch(function (error) {
          console.log(error);
          toaster.show({
            message: error.message || "Bład pobierania listy projektów.",
            type: "error",
          });
        });
    }
  }, [refetchProjects]);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <ScrollView
          style={[styles.projectsList]}
          //@ts-ignore
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          {refetchProjects ? (
            <ActivityIndicator animating={true} />
          ) : (
            projects.map((project) => (
              <ProjectTile
                navigation={navigation}
                key={project.id}
                project={project}
                password={password}
                setPassword={setPassword}
                username={username}
                setUsername={setUsername}
                refetchProjects={refetchProjects}
                setRefetchProjects={setRefetchProjects}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },

  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  projectsList: {
    height: 550,
    display: "flex",
    flexDirection: "column",
  },
  projectsListItem: {
    paddingVertical: 5,
  },
});
