import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  //projects.push({ author: "test author from js", title: "test1" });

  useEffect(() => {
    axios
      .get("http://localhost:5555/projects")
      .then(function (response) {
        console.log("response", response);
        setProjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

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
          {projects.map((project: any) => {
            return (
              <MonoText style={[styles.projectsListItem]}>
                {`id: ${project.id}, author: ${project.author}, title: ${project.title}, file name: ${project.internal_filename} `}
              </MonoText>
            );
          })}
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
