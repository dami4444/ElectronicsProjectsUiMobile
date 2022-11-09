import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function AddProject({ path }: { path: string }) {
  const USERNAME = "fesz";
  const PASSWORD = "admin";

  const handleFormSubmit = () => {
    const data = {
      id: 3,
      title: "JS_TEST2",
      author: "Damian",
      date: 2022,
      academic_year: 2022,
      is_diploma: false,
      category: "application",
      files_names: "",
    };

    const formData = new FormData();

    //@ts-ignore
    const file = document.getElementById("file");
    // let filenameParam = encodeURIComponent(1);
    // filenameParam += encodeURIComponent("/");
    // filenameParam += encodeURIComponent(file.name);

    //var file = document.querySelector("#file");
    //@ts-ignore
    if (file) formData.append("file", file.files[0]);
    formData.append("json", JSON.stringify(data));

    axios
      .post("http://localhost:5555/admin/add_mp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: USERNAME,
          password: PASSWORD,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Podaj informacje o projekcie:
        </Text>

        <form
          id="uploadForm"
          action="http://localhost:5555/admin/add_mp"
          role="form"
          method="post"
        >
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label for="file">Plik Projektu: </label>
            <input type="file" id="file" name="file" />
            <input
              type="button"
              value="Dodaj Projekt"
              onClick={handleFormSubmit}
            />
          </Text>
        </form>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Pozostale informacje o projekcie sa ustawione na sztywno poniewaz to
          tylko test polaczenia z API i baza danych.
        </Text>
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
});
