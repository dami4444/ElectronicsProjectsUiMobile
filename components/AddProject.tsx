import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { AuthProps } from "./LogIn";
import { RefetchProjectsProps } from "../navigation";
import { Button, Switch, TextInput } from "react-native-paper";

export default function AddProject({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
}: AuthProps & RefetchProjectsProps) {
  // const USERNAME = "fesz";
  // const PASSWORD = "admin";

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

  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const pickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync();
    setFile(res);
  };

  // console.log("state", title, author, isDiploma);

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

    //@ts-ignore
    // let filenameParam = encodeURIComponent(1);
    // filenameParam += encodeURIComponent("/");
    // filenameParam += encodeURIComponent(file.name);

    //var file = document.querySelector("#file");

    const formData = new FormData();

    //@ts-ignore
    if (file.file) formData.append("file", file.file);
    formData.append("json", JSON.stringify(data));

    axios
      .post("http://localhost:5555/admin/add_mp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    return (
      <View style={styles.getStartedContainer}>
        <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Aby dodać projekt musisz zalogować się na konto administratora.
        </Text>
        <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Panel logowania dostępny jest po kliknięciu przycisku po prawej
          stronie na górze.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* <form
        id="uploadForm"
        action="http://localhost:5555/admin/add_mp"
        role="form"
        method="post"
      > */}
      <View style={styles.form}>
        <View
          style={styles.textInputView}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          <TextInput
            label="Tytuł"
            ref={titleRef}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View
          style={styles.textInputView}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          <TextInput
            label="Autor"
            ref={authorRef}
            onChangeText={(text) => setAuthor(text)}
          />
        </View>

        <View
          style={styles.textInputView}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          <TextInput
            label="Rok akademicki"
            keyboardType="number-pad"
            ref={dateRef}
            onChangeText={(text) => setDate(Number(text))}
          />
        </View>

        <Text
          style={styles.formLineSwitch}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Projekt dyplomowy:
          <View style={styles.textInputView}>
            <Switch
              ref={isDiplomaRef}
              onValueChange={toggleIsDiploma}
              value={isDiploma}
            />
          </View>
        </Text>

        <View
          style={styles.textInputView}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          <TextInput
            label="Kategoria"
            ref={categoryRef}
            onChangeText={(text) => setCategory(text)}
          />
        </View>

        <View style={styles.filePicker}>
          <Button
            onPress={pickFile}
            title="Wybierz plik"
            // color="#841584"
          >
            Wybierz plik projektu
          </Button>
          <Text
            style={styles.fileName}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {file?.type === "success" ? file.name : null}
          </Text>
        </View>

        <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          <View>
            <Button
              mode="contained"
              onPress={handleFormSubmit}
              text="Dodaj Projekt"
              color="#841584"
              // accessibilityLabel="Learn more about this purple button"
            >
              Dodaj Projekt
            </Button>
          </View>
        </Text>
      </View>
      {/* </form> */}
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
  formLine: {
    padding: 4,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  fileName: {
    minHeight: 24,
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
  filePicker: {
    marginBottom: 8,
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
