import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const Start = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: windowWidth,
          height: 300,
          top: 100,
        }}
        source={require("../assets/logo.jpg")}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.buttonContainer}
      >
        <Text style={styles.createButton}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.buttonContainer}
      >
        <Text style={styles.createButton}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 30,
    top: "25%",
  },
  createButton: {
    fontSize: 26,
    color: "#003366",
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black", // Đặt màu nền của toàn bộ ứng dụng thành đen
  },
});
