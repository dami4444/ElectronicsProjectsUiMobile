import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { useRef, useState } from "react";
import { StyleSheet, Switch, TextInput, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function AddProject({ path }: { path: string }) {
  const USERNAME = "fesz";
  const PASSWORD = "admin";

  const titleRef = useRef<TextInput>(null);
  const authorRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const isDiplomaRef = useRef<Switch>(null);
  const categoryRef = useRef<TextInput>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(0);
  const [isDiploma, setIsDiploma] = useState(false);
  const toggleIsDiploma = () => setIsDiploma((previousState) => !previousState);
  const [category, setCategory] = useState("");

  console.log("state", title, author, isDiploma);

  const handleFormSubmit = () => {
    // const data = {
    //   id: 3,
    //   title: "JS_TEST2",
    //   author: "Damian",
    //   date: 2022,
    //   academic_year: 2022,
    //   is_diploma: false,
    //   category: "application",
    //   files_names: "",
    // };

    const data = {
      id: 1,
      title: title,
      author: author,
      date: date,
      academic_year: date,
      is_diploma: isDiploma,
      category: category,
      // files_names: "",
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
      <form
        id="uploadForm"
        action="http://localhost:5555/admin/add_mp"
        role="form"
        method="post"
      >
        <View style={styles.form}>
          <Text
            style={styles.formLine}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label htmlFor="title">Tytuł: </label>
            <View
              style={styles.textInputView}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              <TextInput
                style={styles.textInput}
                ref={titleRef}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
          </Text>

          <Text
            style={styles.formLine}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label htmlFor="author">Autor: </label>
            <View
              style={styles.textInputView}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              <TextInput
                style={styles.textInput}
                ref={authorRef}
                onChangeText={(text) => setAuthor(text)}
              />
            </View>
          </Text>

          <Text
            style={styles.formLine}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label htmlFor="date">Rok akademicki: </label>
            <View
              style={styles.textInputView}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              <TextInput
                style={styles.textInput}
                keyboardType="number-pad"
                ref={dateRef}
                onChangeText={(text) => setDate(Number(text))}
              />
            </View>
          </Text>

          <Text
            style={styles.formLineSwitch}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label htmlFor="isDiploma">Projekt dyplomowy: </label>

            <View style={styles.textInputView}>
              <Switch
                ref={isDiplomaRef}
                onValueChange={toggleIsDiploma}
                value={isDiploma}
              />
            </View>
          </Text>

          <Text
            style={styles.formLine}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label htmlFor="category">Kategoria: </label>
            <View
              style={styles.textInputView}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              <TextInput
                style={styles.textInput}
                ref={categoryRef}
                onChangeText={(text) => setCategory(text)}
              />
            </View>
          </Text>

          <Text
            style={styles.formLine}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <label htmlFor="file">Plik Projektu: </label>
            <input type="file" id="file" name="file" />
          </Text>
          <Text
            style={styles.textInput}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <input
              type="button"
              value="Dodaj Projekt"
              onClick={handleFormSubmit}
            />
          </Text>
        </View>
      </form>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
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
  formLine: {
    padding: 4,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  formLineSwitch: {
    padding: 4,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
    display: "flex",
    alignContent: "center",
  },
  textInput: {
    padding: 4,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  textInputView: {
    margin: 4,
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
