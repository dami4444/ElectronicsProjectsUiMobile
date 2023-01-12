import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { Button, Card, Modal, Portal } from "react-native-paper";

import Colors from "../constants/Colors";
import { RefetchProjectsProps } from "../navigation";
import { Text, View } from "./Themed";

export type ProjectData = {
  id: number;
  academic_year: number;
  author: string;
  category: string;
  files_link: string;
  internal_filename: string;
  is_diploma: boolean;
  title: string;
};
export type OrderBy = "asc" | "desc" | "";

export enum SortByValues {
  TITLE_FILTER = "title",
  AUTHOR_FILTER = "author",
  YEAR_FILTER = "academic_year",
  CATEGORY_FILTER = "category",
}

export enum SortByDisplayedValues {
  "title" = "Tutuł",
  "author" = "Autor",
  "academic_year" = "Rok akademicki",
  "category" = "Kategoria",
}

export type SortProps = {
  titleFilter: string;
  authorFilter: string;
  yearFilter: number;
  categoryFilter: string;
  sortBy: SortByValues | "";
  orderBy: OrderBy;

  setTitleFilter: (titleFilter: string) => void;
  setAuthorFilter: (authorFilter: string) => void;
  setYearFilter: (yearFilter: number) => void;
  setCategoryFilter: (categoryFilter: string) => void;
  setSortBy: (sortBy: SortByValues | "") => void;
  setOrderBy: (orderBy: OrderBy) => void;
};

export default function ProjectsListSort({
  sortProps,
  refetchProjects,
  setRefetchProjects,
}: { sortProps: SortProps } & RefetchProjectsProps) {
  const colorScheme = useColorScheme();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const toggleOrderBy = () => {
    const { sortBy, orderBy, setOrderBy } = sortProps;
    if (sortBy === "") return;
    if (orderBy === "") return setOrderBy("asc");
    if (orderBy === "asc") return setOrderBy("desc");
    if (orderBy === "desc") return setOrderBy("");
  };

  const getSortIconName = () => {
    const { orderBy, sortBy } = sortProps;
    if (orderBy === "" || sortBy === "") return "sort";
    if (orderBy === "asc") return "sort-up";
    if (orderBy === "desc") return "sort-down";
  };

  return (
    <>
      <Portal>
        <Modal
          contentContainerStyle={styles.modalStyle}
          visible={visible}
          onDismiss={hideModal}
        >
          <Card>
            <Card.Content style={styles.sortModal}>
              <Text variant="bodyMedium">
                Wybierz po czym sortować listę projektów.
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="elevated"
                style={styles.sortByButton}
                onPress={() => {
                  sortProps.setOrderBy("");
                  sortProps.setSortBy("");
                }}
              >
                Wyczyść
              </Button>
              <Button
                style={styles.sortByButton}
                mode="contained"
                onPress={() => sortProps.setSortBy(SortByValues.TITLE_FILTER)}
              >
                Tytuł
              </Button>
              <Button
                style={styles.sortByButton}
                mode="contained"
                onPress={() => sortProps.setSortBy(SortByValues.AUTHOR_FILTER)}
              >
                Autor
              </Button>
            </Card.Actions>
            <Card.Actions>
              <Button
                style={styles.sortByButton}
                mode="contained"
                onPress={() => sortProps.setSortBy(SortByValues.YEAR_FILTER)}
              >
                Rok akademicki
              </Button>
              <Button
                style={styles.sortByButton}
                mode="contained"
                onPress={() =>
                  sortProps.setSortBy(SortByValues.CATEGORY_FILTER)
                }
              >
                Kategoria
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
      <View style={styles.getStartedContainer}>
        <TouchableOpacity onPress={() => toggleOrderBy()}>
          <FontAwesome
            name={getSortIconName()}
            size={25}
            color={Colors[colorScheme || "dark"].text}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showModal()}>
          <Text>
            {sortProps.sortBy
              ? SortByDisplayedValues[`${sortProps.sortBy}`]
              : "Wybierz sortowanie"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },

  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  projectsList: {
    height: 550,
    display: "flex",
    flexDirection: "column",
  },
  projectsListItem: {
    paddingVertical: 5,
  },
  modalStyle: {
    margin: 30,
    minWidth: 200,
  },
  sortModal: {
    minHeight: 64,
  },
  sortByButton: {
    width: 150,
  },
});
