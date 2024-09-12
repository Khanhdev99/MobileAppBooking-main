import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
  Pressable,
  Platform,
} from "react-native";
import styles from "./css/FormAdminStyle";
import {
  GestureHandlerRootView,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";

import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

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

export default function UserForm({ route }) {
  const { inputText } = route.params;
  const user_name = inputText;

  const [listBooking, setListBooking] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [isModalUpVisible, setIsModalUpVisible] = useState(false);
  const [isModalDownVisible, setIsModalDownVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [orderAmount, setOrderAmount] = useState(null);

  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  useEffect(() => {
    handleRead();
  }, []);

  const handleRead = async () => {
    try {
      const snapshotBooking = await get(ref(database, "Booking"));
      const snapshotPayment = await get(ref(database, "Payment"));
      if (snapshotBooking.exists() && snapshotPayment.exists()) {
        setListBooking(snapshotBooking.val());
        setListPayment(snapshotPayment.val());
        console.log(snapshotBooking.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoreUpPress = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalUpVisible(true);
  };

  const handleMoreDownPress = (paymentID) => {
    setSelectedPaymentId(paymentID);
    setIsModalDownVisible(true);
  };

  const create = (path, name, value) => {
    set(ref(database, path + name), value);
  };

  const handlePress = async () => {
    // Xử lý các hành động khi nút được nhấn ở đây
    if (orderAmount !== null) {
      // Only proceed if orderAmount is not null
      create(
        "/Booking/" + selectedBookingId.toString() + "/",
        "Amount",
        orderAmount
      );
      setIsModalUpVisible(false); // Close the modal after accepting
    } else {
      // Handle case where orderAmount is null (not yet filled)
      console.log("Please enter order amount");
    }
  };

  //Xứ lý bật tắt date picker
  const toggleDatePicker = () => {
    setShowPicker(true);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if ((type = "set")) {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toString());
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <GestureHandlerRootView
        style={[styles.white, styles.width_100, styles.height_100]}
      >
        <GestureHandlerScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* header */}
          <View style={[styles.flex, styles.black]}>
            <Text style={[styles.br_20]}></Text>
            <ImageBackground
              source={require("../assets/logo.jpg")}
              style={styles.logo}
            ></ImageBackground>
            <Text style={[styles.br_20]}></Text>
            <Text style={[{ color: "white", fontSize: 16 }]}>slogan</Text>

            <ImageBackground
              source={require("../assets/images/tra.png")}
              style={{ width: "100%", height: 115 }}
            ></ImageBackground>
          </View>

          {/* user */}
          <Text style={[styles.br_30]}></Text>

          <View style={styles.flex_row}>
            <ImageBackground
              source={require("../assets/images/DSC00200.jpg")}
              style={{ width: 85, height: 85, marginLeft: 20, marginRight: 20 }}
            ></ImageBackground>
            <View style={styles.flex_column}>
              <Text style={[styles.br_20]}></Text>
              <Text style={{ fontSize: 20 }}>{user_name}</Text>
              <View style={styles.flex_row}>
                <Text>Tổng tiền </Text>
                <Text>Level 1</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.br_20]}></Text>
          <Text style={[styles.br_20]}></Text>

          {/* Đơn hàng tích lũy */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>
            Đơn hàng
          </Text>
          <Text style={[styles.br_20]}></Text>
          <View style={styles.orderContainer}>
            <GestureHandlerScrollView
              style={styles.scrollViews}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {Object.keys(listBooking).map((bookingKey) => (
                <View style={styles.item} key={bookingKey}>
                  <Text style={styles.title}>
                    {listBooking[bookingKey].Hub}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleMoreUpPress(bookingKey)}
                    style={styles.moreButton}
                  >
                    <Text style={styles.moreButtonText}>More</Text>
                    {/* Icon cho nút More có thể thêm vào đây */}
                  </TouchableOpacity>
                </View>
              ))}
            </GestureHandlerScrollView>
          </View>

          <Text style={[styles.br_40]}></Text>
          {/* Yêu Cầu Thanh Toán */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>
            Yên Cầu Thanh Toán
          </Text>
          <Text style={[styles.br_20]}></Text>
          <View style={styles.orderContainer}>
            <GestureHandlerScrollView
              style={styles.scrollViews}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {Object.keys(listPayment).map((paymentKey) => (
                <View style={styles.item} key={paymentKey}>
                  <Text style={styles.title}>
                    {listPayment[paymentKey].Name}
                  </Text>
                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => handleMoreDownPress(paymentKey)}
                  >
                    <Text style={styles.moreButtonText}>More</Text>
                    {/* Icon cho nút More có thể thêm vào đây */}
                  </TouchableOpacity>
                </View>
              ))}
            </GestureHandlerScrollView>
          </View>

          <View style={styles.flex}>
            <ImageBackground
              source={require("../assets/images/DSC00791.jpg")}
              style={[
                { width: 250, height: 250, marginLeft: 20, marginRight: 20 },
              ]}
            ></ImageBackground>
          </View>

          <Modal
            visible={isModalUpVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalUpVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16 }}>Review and Confirm</Text>

              {/* Add your modal content here */}
              <ImageBackground
                source={require("../assets/logo.jpg")}
                style={styles.avatar}
              />
              <Text style={styles.userNameModal}>
                {selectedBookingId && listBooking[selectedBookingId].Name}
              </Text>
              <Text style={styles.userEmailModal}>
                {selectedBookingId && listBooking[selectedBookingId].Phone}
              </Text>

              <View style={styles.dropdownContainer}>
                <Text style={{ padding: 10, fontSize: 16, marginLeft: 10 }}>
                  Đơn tại:
                </Text>
                {/* Drop box ở đây */}
                <View style={[styles.containerDropDown, styles.flex_row]}>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select item" : "..."}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item.value);
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
                </View>
              </View>

              <View style={styles.dropdownContainer}>
                <Text style={{ padding: 10, fontSize: 16, marginLeft: 26 }}>
                  Chi tiết:
                </Text>
                {/* Drop box ở đây */}
                <View style={[styles.containerDropDown, styles.flex_row]}>
                  <TextInput
                    onChange={(text) => {}}
                    style={styles.detailInput}
                    placeholder="nhập nội dung chi tiết"
                  ></TextInput>
                </View>
              </View>

              <View style={{ marginVertical: "5%" }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  Tổng số tiền
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#E7E7E7",
                  width: "60%",
                  height: 100,
                  paddingVertical: 35,
                }}
              >
                <TextInput
                  textAlign="center"
                  style={{ fontSize: 30 }}
                  onChangeText={(text) => setOrderAmount(text)} // Update orderAmount when text changes
                  value={orderAmount} // Set the value of TextInput to orderAmount
                ></TextInput>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handlePress} // Call handlePress when button is pressed
                  style={[styles.buttonModal, { backgroundColor: "#009470" }]}
                >
                  <Text style={styles.modalButtonText}>Chấp nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonModal, { backgroundColor: "red" }]}
                >
                  <Text style={styles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isModalDownVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalDownVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16 }}>Review and Confirm</Text>

              {/* Add your modal content here */}
              <ImageBackground
                source={require("../assets/logo.jpg")}
                style={styles.avatar}
              />
              <Text style={styles.userNameModal}>
                {selectedPaymentId && listPayment[selectedPaymentId].Name}
              </Text>
              <Text style={styles.userEmailModal}>
                {selectedPaymentId && listPayment[selectedPaymentId].Number}
              </Text>

              <View style={styles.formContainer}>
                <Text style={{ padding: 10, fontSize: 16, marginLeft: 26 }}>
                  Tên:
                </Text>
                {/* Drop box ở đây */}
                <View style={[styles.containerDropDown]}>
                  <TextInput
                    style={[styles.detailInput]}
                    placeholder="cả họ và tên"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.formContainer}>
                <Text style={{ padding: 10, fontSize: 16, marginLeft: 26 }}>
                  Ngân hàng:
                </Text>
                {/* Drop box ở đây */}
                <View style={[styles.containerDropDown]}>
                  <TextInput
                    style={[styles.detailInput, { width: "82%" }]}
                    placeholder="Chi nhánh"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.formContainer}>
                <Text style={{ padding: 10, fontSize: 16, marginLeft: 26 }}>
                  STK
                </Text>
                {/* Drop box ở đây */}
                <View style={[styles.containerDropDown]}>
                  <TextInput style={[styles.detailInput]}></TextInput>
                </View>
              </View>

              <View style={styles.formContainer}>
                <Text style={{ padding: 10, fontSize: 16, marginLeft: 26 }}>
                  Thời gian
                </Text>
                {/* Drop box ở đây */}
                <View style={[styles.containerDropDown]}>
                  <TextInput
                    style={[styles.detailInput, { width: "84.3%" }]}
                    placeholder="11/12/2023"
                  ></TextInput>
                </View>
              </View>

              <View style={{ marginVertical: "5%" }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  Tổng số tiền
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#E7E7E7",
                  width: "60%",
                  height: 100,
                  paddingVertical: 35,
                }}
              >
                <TextInput
                  textAlign="center"
                  style={{ fontSize: 30 }}
                ></TextInput>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.buttonModal, { backgroundColor: "#009470" }]}
                >
                  <Text style={styles.modalButtonText}>Chấp nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonModal, { backgroundColor: "red" }]}
                >
                  <Text style={styles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </GestureHandlerScrollView>
      </GestureHandlerRootView>
    </>
  );
}
