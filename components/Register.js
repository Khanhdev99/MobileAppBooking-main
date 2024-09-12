import {
  KeyboardAvoidingView,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Picker } from "@react-native-picker/picker";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview'; // Import WebView

import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  GestureHandlerRootView,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";


import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

import DatePickerComponent from "../DatePickerComponent";

const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
}




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

const Register = () => {
  return <WebView source={{ uri: 'https://bookingshit-3c16d.web.app/' }} style={{ flex: 1 }} />;
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    position: "relative", // Sử dụng position: "relative" để phần tử con có thể sử dụng position: "absolute" để định v
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    width: "100%", // Chiếm toàn bộ chiều rộng của màn hình
    backgroundColor: "black",
    alignItems: "center",
    position: "absolute", // Định vị phần tử
    top: 0,
    paddingBottom: 200, // Chạm vào phía trên cùng của màn hình
  },
  logoImage: {
    width: "100%", // Thay đổi kích thước theo ý của bạn
    height: 250, // Thay đổi kích thước theo ý của bạn
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  slogan: {
    fontSize: 16,
    color: "grey",
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#E7E7E7",
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
