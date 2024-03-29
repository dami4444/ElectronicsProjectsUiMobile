import axios from "axios";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Modal, Portal, Text } from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import { axiosBaseUrl } from "../constants/AxiosBaseUrl";

import { RefetchProjectsProps } from "../navigation";
import { AuthProps } from "./LogIn";
import { ProjectData } from "./ProjectsList";

export default function DeleteProject({
  project,
  username,
  password,
  setRefetchProjects,
  navigation,
  isInProjectDetails,
}: {
  project: ProjectData;
  navigation?: any;
  isInProjectDetails?: boolean;
} & AuthProps &
  RefetchProjectsProps) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const toaster = useToast();

  const handleDeleteProject = () => {
    axios
      .delete(axiosBaseUrl + `admin/delete/${project.id}`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        setRefetchProjects(true);
        toaster.show({
          message: `Usunięto projekt ${project.title}.`,
          type: "success",
        });

        if (isInProjectDetails && navigation.navigate) {
          navigation.navigate("TabOne");
        }
      })
      .catch(function (error) {
        toaster.show({
          message: error.message || "Bład usuwania projektu.",
          type: "error",
        });
      });
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

const styles = StyleSheet.create({
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
