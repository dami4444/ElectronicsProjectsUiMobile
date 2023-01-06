import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import { AuthProps } from "./LogIn";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function DeleteProject({
  id,
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
}: {
  id: number;
} & AuthProps &
  RefetchProjectsProps) {
  // const USERNAME = "fesz";
  // const PASSWORD = "admin";

  const handleDeleteProject = () => {
    axios
      .delete(`http://localhost:5555/admin/delete/${id}`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        console.log(response);
        setRefetchProjects(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const isLoggedIn = !!username && !!password;
  if (!isLoggedIn) {
    return null;
  }
  return <Button onPress={handleDeleteProject}>Usuń</Button>;
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
});
