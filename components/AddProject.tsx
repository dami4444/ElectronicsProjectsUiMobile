import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { AuthProps } from "./LogIn";
import { RefetchProjectsProps } from "../navigation";
import { Button, Switch, TextInput } from "react-native-paper";
import { axiosBaseUrl } from "../constants/AxiosBaseUrl";

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

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const dateRef = useRef(null);
  const isDiplomaRef = useRef(null);
  const categoryRef = useRef(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(0);
  const [isDiploma, setIsDiploma] = useState(false);
  const toggleIsDiploma = () => setIsDiploma((previousState) => !previousState);
  const [category, setCategory] = useState("");

  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const pickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });
    setFile(res);
  };

  // console.log("state", title, author, isDiploma);

  // const dataURItoBlob = async (dataURI: string) => {
  //   const response = await fetch(dataURI);
  //   const blob = await response.blob();
  //   const blobText = await blob.text();
  //   console.log("blobText", blobText);
  //   return blob;
  // };

  // const URItoBlob = (dataURI: string) => {
  //   const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
  //   const binary = atob(dataURI.split(",")[1]);
  //   const array = [];
  //   for (let i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //   }
  //   return new Blob([new Uint8Array(array)], { type: mime });
  // };

  const handleFormSubmit = async () => {
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

    if (file && file.type === "success") {
      if (file.file) {
        formData.append("file", file.file);
      } else {
        formData.append("file", {
          name: file.name,
          type: file.mimeType,
          uri:
            Platform.OS === "android"
              ? file.uri
              : file.uri.replace("file://", ""),
        } as any);
      }
    }
    formData.append("json", JSON.stringify(data));

    // console.log("file", file);
    //@ts-ignore
    // console.log("file.file", file?.file || "file.file is undefined");

    console.log("formData", formData);

    axios
      .post(axiosBaseUrl + "admin/add_mp", formData, {
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
