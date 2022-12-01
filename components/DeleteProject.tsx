import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { AuthProps } from "./LogIn";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function DeleteProject({
  id,
  setUsername,
  setPassword,
  username,
  password,
}: {
  id: number;
} & AuthProps) {
  // const USERNAME = "fesz";
  // const PASSWORD = "admin";

  const handleDeleteProject = () => {
    //@ts-ignore
    // let filenameParam = encodeURIComponent(1);
    // filenameParam += encodeURIComponent("/");
    // filenameParam += encodeURIComponent(file.name);

    //var file = document.querySelector("#file");
    //@ts-ignore

    axios
      .get(`http://localhost:5555/admin/check`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post(
        `http://localhost:5555/admin/delete/${id}`,
        {},
        {
          auth: {
            username: username,
            password: password,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <button onClick={handleDeleteProject}>Usuń Projekt</button>
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
});
