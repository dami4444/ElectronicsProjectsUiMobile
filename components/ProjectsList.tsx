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
  //projects.push({ author: "test author from js", title: "test1" });

  useEffect(() => {
    if (refetchProjects) {
      axios
        .get<ProjectData[]>(axiosBaseUrl + "projects")
        .then(function (response) {
          console.log("response", response);
          setProjects(response.data);
          setRefetchProjects(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [refetchProjects]);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Poniżej znajduje się lista projektów obecnych w bazie danych:
        </Text>

        <ScrollView
          style={[
            styles.codeHighlightContainer,
            styles.homeScreenFilename,
            styles.projectsList,
          ]}
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
