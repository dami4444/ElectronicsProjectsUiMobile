import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Portal } from "react-native-paper";

import EditScreenInfo from "../components/EditScreenInfo";
import { AuthProps } from "../components/LogIn";
import ProjectsList from "../components/ProjectsList";
import ProjectsListSort, {
  OrderBy,
  SortByValues,
  SortProps,
} from "../components/ProjectsListSort";
import { Text, View } from "../components/Themed";
import { RefetchProjectsProps } from "../navigation";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
}: RootTabScreenProps<"TabOne"> & AuthProps & RefetchProjectsProps) {
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortByValues | "">("");
  const [orderBy, setOrderBy] = useState<OrderBy>("");

  const sortProps: SortProps = {
    titleFilter: titleFilter,
    authorFilter: authorFilter,
    yearFilter: yearFilter,
    categoryFilter: categoryFilter,
    sortBy: sortBy,
    orderBy: orderBy,
    setTitleFilter: setTitleFilter,
    setAuthorFilter: setAuthorFilter,
    setYearFilter: setYearFilter,
    setCategoryFilter: setCategoryFilter,
    setSortBy: setSortBy,
    setOrderBy: setOrderBy,
  };

  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.titleAndSort}>
          <Text style={styles.hiddenTitle}>Lista Projektów</Text>
          <Text style={styles.title}>Lista Projektów</Text>
          <ProjectsListSort
            sortProps={sortProps}
            refetchProjects={refetchProjects}
            setRefetchProjects={setRefetchProjects}
          />
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <ProjectsList
          sortProps={sortProps}
          navigation={navigation}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          refetchProjects={refetchProjects}
          setRefetchProjects={setRefetchProjects}
        />
      </View>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  titleAndSort: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  hiddenTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "transparent",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    marginLeft: "10%",
  },
});
