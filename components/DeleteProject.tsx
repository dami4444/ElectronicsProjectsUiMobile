import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card, Modal, Portal, Text } from "react-native-paper";

import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import { AuthProps } from "./LogIn";
import { ProjectData } from "./ProjectsList";
import { MonoText } from "./StyledText";
import { View } from "./Themed";

export default function DeleteProject({
  project,
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
}: {
  project: ProjectData;
} & AuthProps &
  RefetchProjectsProps) {
  // const USERNAME = "fesz";
  // const PASSWORD = "admin";

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDeleteProject = () => {
    axios
      .delete(`http://localhost:5555/admin/delete/${project.id}`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        console.log(response);
        setRefetchProjects(true);
      })
      .catch(function (error) {});
  };

  const isLoggedIn = !!username && !!password;
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Portal>
        <Modal
          contentContainerStyle={styles.modalStyle}
          visible={visible}
          onDismiss={hideModal}
        >
          <Card>
            <Card.Content style={styles.deleteConfirmationCardContent}>
              <Text variant="bodyMedium">
                Czy na pewno chcesz usunąć projekt{" "}
                <Text style={styles.projectTitle} variant="bodyMedium">
                  {project.title}
                </Text>{" "}
                ?
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={handleDeleteProject}>
                Usuń
              </Button>
              <Button mode="elevated" onPress={hideModal}>
                Anuluj
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
      <Button onPress={showModal}>Usuń</Button>
    </>
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
  confirmDeleteButtons: {
    display: "flex",
    width: "100%",
    flexWrap: "nowrap",
  },
  deleteConfirmationCardContent: {
    minHeight: 64,
  },
  projectTitle: {
    fontWeight: "bold",
  },
  modalStyle: {
    margin: 30,
    minWidth: 200,
  },
});
