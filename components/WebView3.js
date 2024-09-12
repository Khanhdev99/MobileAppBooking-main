import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

import { useNavigation } from "@react-navigation/native";

import { WebView } from "react-native-webview";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function WebView3({ route }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCicrLXIoWCQd3XvIFoNaUrYpuCRydsgaQ",
    authDomain: "bookingshit-3c16d.firebaseapp.com",
    databaseURL: "https://bookingshit-3c16d-default-rtdb.firebaseio.com",
    projectId: "bookingshit-3c16d",
    storageBucket: "bookingshit-3c16d.appspot.com",
    messagingSenderId: "948204112931",
    appId: "1:948204112931:web:c44088284d7536bd9af596",
    measurementId: "G-WKYFMTPZJ6",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const { inputText } = route.params;
  const username = inputText;

  const [folder, setFolder] = useState([]);

  function read(path, value) {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          value.val = snapshot.val();
          return value.val; // Returning the value for further handling
        } else {
          console.log("No data available");
          return null; // Returning null if no data is available
        }
      })
      .catch((error) => {
        console.error(error);
        return null; // Returning null in case of an error
      });
  }

  useEffect(() => {
    handleRead();
    console.log(folder);
  }, []);

  const handleRead = async () => {
    let values = { val: null };
    await read("Folder/Value", values);
    // Do something with the input values
    let currentValue = 0;
    if (values.val < 4) {
      currentValue = 3;
    } else {
      currentValue = values.val;
      console.log(currentValue);
    }
    try {
      const snapshotFolder = await get(ref(database, "Folder/" + currentValue));
      if (snapshotFolder.exists()) {
        setFolder(snapshotFolder.val());
        console.log(snapshotFolder.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("CTVForm", { inputText: username + "3" });
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Icon "Back" */}
        <Text style={{ height: 30, backgroundColor: "white" }}></Text>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
          {/* Icon "Back" */}
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <WebView
          source={{
            uri: folder.Uri,
          }}
          style={{ flex: 1 }}
        />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  backButtonText: {
    marginLeft: 5,
  },
});
