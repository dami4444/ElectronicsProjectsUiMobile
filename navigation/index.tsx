/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { AuthProps } from "../components/LogIn";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProjectScreen from "../screens/ProjectScreem";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import "../helpers/base64Polyfill";

export const usernameStorageKey = "username";
export const passwordStorageKey = "password";

export type RefetchProjectsProps = {
  setRefetchProjects: (shouldRefetch: boolean) => void;
  refetchProjects: boolean;
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refetchProjects, setRefetchProjects] = useState(true);

  const storeCredentials = async () => {
    try {
      await AsyncStorage.setItem(usernameStorageKey, username);
      await AsyncStorage.setItem(passwordStorageKey, password);
      console.log("Saved credentials");
    } catch (error) {
      console.error("Error saving credentials");
    }
  };

  const retrieveCredentials = async () => {
    try {
      const usernameStorage = await AsyncStorage.getItem(usernameStorageKey);
      const passwordStorage = await AsyncStorage.getItem(passwordStorageKey);
      if (usernameStorage !== null && passwordStorage !== null) {
        setUsername(usernameStorage);
        setPassword(passwordStorage);
      } else {
        console.log("No credentials in storage");
      }
    } catch (error) {
      console.error("Error retrieving credentials");
    }
  };

  React.useEffect(() => {
    if (username && password) {
      storeCredentials();
    } else {
      retrieveCredentials();
    }
  }, [username, password]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {(props) => (
          <BottomTabNavigator
            {...props}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            refetchProjects={refetchProjects}
            setRefetchProjects={setRefetchProjects}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Logowanie">
          {(props) => (
            <ModalScreen
              {...props}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Szczegóły Projektu">
          {(props) => (
            <ProjectScreen
              {...props}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              refetchProjects={refetchProjects}
              setRefetchProjects={setRefetchProjects}
            />
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}
//TODO: use global state in auth endpoints

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({
  setUsername,
  setPassword,
  username,
  password,
  refetchProjects,
  setRefetchProjects,
}: AuthProps & RefetchProjectsProps) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Lista Projektów",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Logowanie")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      >
        {(props) => (
          <TabOneScreen
            {...props}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            refetchProjects={refetchProjects}
            setRefetchProjects={setRefetchProjects}
          />
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="TabTwo"
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          title: "Dodaj Projekt",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Logowanie")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      >
        {(props) => (
          <TabTwoScreen
            {...props}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            refetchProjects={refetchProjects}
            setRefetchProjects={setRefetchProjects}
          />
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
