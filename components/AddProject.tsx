import axios from "axios";
import React, { useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Text, View } from "./Themed";
import { AuthProps } from "./LogIn";
import { RefetchProjectsProps } from "../navigation";
import { Button, Switch, TextInput } from "react-native-paper";
import { axiosBaseUrl } from "../constants/AxiosBaseUrl";
import { useToast } from "react-native-paper-toast";

export default function AddProject({
  username,
  password,
  setRefetchProjects,
}: AuthProps & RefetchProjectsProps) {
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

  const toaster = useToast();

  const handleFormSubmit = async () => {
    const data = {
      id: 1,
      title: title,
      author: author,
      date: date,
      academic_year: date,
      is_diploma: isDiploma,
      category: category,
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
        setRefetchProjects(true);
        toaster.show({
          message: "Projekt dodany pomyślnie.",
          type: "success",
        });
      })
      .catch(function (error) {
        toaster.show({
          message: error.message || "Bład podczas dodawania projektu.",
          type: "error",
        });
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
        <TextInput
          style={styles.textInputView}
          label="Tytuł"
          ref={titleRef}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.textInputView}
          label="Autor"
          ref={authorRef}
          onChangeText={(text) => setAuthor(text)}
        />

        <TextInput
          style={styles.textInputView}
          label="Rok akademicki"
          keyboardType="number-pad"
          ref={dateRef}
          onChangeText={(text) => setDate(Number(text))}
        />

        <TextInput
          style={styles.textInputView}
          label="Kategoria"
          ref={categoryRef}
          onChangeText={(text) => setCategory(text)}
        />

        <View style={styles.formLineSwitch}>
          <Text>Projekt dyplomowy:</Text>
          <Switch
            style={styles.switch}
            ref={isDiplomaRef}
            onValueChange={toggleIsDiploma}
            value={isDiploma}
          />
        </View>

        <View style={styles.filePicker}>
          <Button
            style={styles.longTextButton}
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

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleFormSubmit}
          color="#841584"
        >
          Dodaj Projekt
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    marginHorizontal: 50,
  },
  textInputView: {
    margin: 8,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },

  fileName: {
    minHeight: 24,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 8,
  },
  formLineSwitch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  switch: {
    marginLeft: 4,
  },
  filePicker: {
    marginTop: 0,
  },

  button: {
    margin: 4,
    width: "50%",
    minWidth: 100,
    marginHorizontal: "25%",
  },
  longTextButton: {
    minWidth: 150,
    width: "50%",
    margin: "auto",
    marginHorizontal: "25%",
  },
});
