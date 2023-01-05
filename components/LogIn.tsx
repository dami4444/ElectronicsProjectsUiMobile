import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export type AuthProps = {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  username: string;
  password: string;
};

export default function LogIn({
  setUsername,
  setPassword,
  username,
  password,
}: AuthProps) {
  const [typedUsername, setTypedUsername] = useState("");
  const [typedPassword, setTypedPassword] = useState("");

  const isLoggedIn = !!username && !!password;

  const USERNAME = "fesz";
  const PASSWORD = "admin";

  const handleLogout = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    // const auth = {
    //   login: typedUsername,
    //   password: typedPassword,
    // };
    console.log("typedUsername", typedUsername, "typedPassword", typedPassword);

    axios
      .get(`http://localhost:5555/admin/check`, {
        auth: {
          username: typedUsername,
          password: typedPassword,
        },
      })
      .then(function (response) {
        console.log(response);
        setUsername(typedUsername);
        setPassword(typedPassword);
      })
      .catch(function (error) {
        console.log(error);
        //TODO: Add toast with error
      });
  };

  const handleReauth = () => {
    // const auth = {
    //   login: typedUsername,
    //   password: typedPassword,
    // };
    console.log("typedUsername", typedUsername, "typedPassword", typedPassword);

    const newCredentials = JSON.stringify({
      login: typedUsername,
      password: typedPassword,
    });

    axios
      .post(
        `http://localhost:5555/admin/reauth`,
        {
          login: typedUsername,
          password: typedPassword,
        },
        {
          auth: {
            username: typedUsername,
            password: typedPassword,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setUsername(typedUsername);
        setPassword(typedPassword);
      })
      .catch(function (error) {
        console.log(error);
        //TODO: Add toast with error
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
          {isLoggedIn
            ? `Jesteś zalogowany jako ${username}`
            : "Zaloguj się jako administrator aby móc usuwać i dodawać projekty."}
        </Text>

        {!isLoggedIn && (
          <>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
              darkColor="rgba(255,255,255,0.05)"
              lightColor="rgba(0,0,0,0.05)"
            >
              <View
                // style={styles.textInputView}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                <TextInput
                  placeholder="Username"
                  style={styles.textInput}
                  // ref={categoryRef}
                  onChangeText={(text) => setTypedUsername(text)}
                />
              </View>
            </View>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
              darkColor="rgba(255,255,255,0.05)"
              lightColor="rgba(0,0,0,0.05)"
            >
              <View
                // style={styles.textInputView}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  // ref={categoryRef}
                  onChangeText={(text) => setTypedPassword(text)}
                />
              </View>
            </View>
          </>
        )}

        <View style={styles.button}>
          {isLoggedIn ? (
            <Button onPress={handleLogout} title="Log out" />
          ) : (
            <Button onPress={handleLogin} title="Log in" />
          )}
        </View>

        {isLoggedIn && (
          <>
            <Text
              style={styles.authDataChange}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              Zmiana danych logowania:
            </Text>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
              darkColor="rgba(255,255,255,0.05)"
              lightColor="rgba(0,0,0,0.05)"
            >
              <View
                // style={styles.textInputView}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                <TextInput
                  placeholder="Username"
                  style={styles.textInput}
                  // ref={categoryRef}
                  onChangeText={(text) => setTypedUsername(text)}
                />
              </View>
            </View>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
              darkColor="rgba(255,255,255,0.05)"
              lightColor="rgba(0,0,0,0.05)"
            >
              <View
                // style={styles.textInputView}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  // ref={categoryRef}
                  onChangeText={(text) => setTypedPassword(text)}
                />
              </View>
            </View>
            <View style={styles.button}>
              <Button onPress={handleReauth} title="Zmień dane" />
            </View>
          </>
        )}
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
    marginBottom: 8,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  authDataChange: {
    marginTop: 24,
    marginBottom: 8,
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
  textInput: {
    padding: 4,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  button: {
    margin: 4,
  },
});
