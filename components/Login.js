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
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import {
  GestureHandlerRootView,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";
const Login = () => {
  const navigation = useNavigation();

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

  const data = [
    { label: "Kế toán", value: "1", form: "Ketoan" },
    { label: "Cộng tác viên", value: "2", form: "CTV" },
    { label: "Lễ tân", value: "3", form: "Letan" },
  ];

  const [value, setValue] = useState(null);
  const [labelling, labellingset] = useState("Letan");
  const [isFocus, setIsFocus] = useState(false);
  const [Pass, SetPass] = useState("");

  const [username, setUsername] = useState("");

  //() => labellingset("Admin");

  return (
    <GestureHandlerRootView>
      <GestureHandlerScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        backgroundColor="black"
      >
        <StatusBar backgroundColor="black" />
        <Text style={{ height: "5%", backgroundColor: "black" }}></Text>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={SetPass}
              value={Pass}
              secureTextEntry
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Chọn vai trò" : "..."}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                labellingset(item.form);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />

            <TouchableOpacity
              onPress={async () => {
                try {
                  const passwording = { val: null };
                  const rolling = { val: null };
		const Activated = {val: null};
                  await read(
                    "User_management/" +
                      username.toString() +
                      "/Account/Password",
                    passwording
                  );
                  await read(
                    "User_management/" + username.toString() + "/Role",
                    rolling
                  );
                  await read(
                    "User_management/" + username.toString() + "/Account/isActivated",
                    Activated
                  );

                  console.log(passwording.val + " : s" + Activated.val);
                  if (passwording.val == Pass && rolling.val == labelling && Activated.val == "true") {
                    navigation.navigate(labelling + "Form", {
                      inputText: username,
                    });
                  } else {
                    alert("Thông tin chưa chính xác!");
                  }
                } catch (error) {
                  alert("Thông tin chưa chính xác");
                }
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ height: 450 }}></Text>
        </View>
      </GestureHandlerScrollView>
    </GestureHandlerRootView>
  );
};

export default Login;

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
    marginTop: "10%",
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
    marginTop: 20,
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
