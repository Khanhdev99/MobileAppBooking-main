import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
} from "react-native";
import styles from "./css/LetanStyle";
import {
  GestureHandlerRootView,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

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
  const ReadOnlyField = ({ label, value }) => (
    <View style={{ padding: 10, fontSize: 16 }}>
      <Text style={{ fontWeight: "bold" }}>{label} </Text>
      <Text>{value}</Text>
    </View>
  );

  const [listBooking, setListBooking] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [isModalUpVisible, setIsModalUpVisible] = useState(false);
  const [isModalDownVisible, setIsModalDownVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(false);
  const [ctvName, setCTVName] = useState("");
  const [ctvPhone, setCTVPhone] = useState("");

  useEffect(() => {
    handleRead();
  }, [ctvName, ctvPhone]);

  const handleRead = async () => {
    try {
      const snapshotBooking = await get(ref(database, "Booking"));
      const snapshotPayment = await get(ref(database, "Payment"));
      if (snapshotBooking.exists() && snapshotPayment.exists()) {
        setListBooking(snapshotBooking.val());
        setListPayment(snapshotPayment.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const getCTVPhone = async (bookingID) => {
    let valueUsername = { val: null };
    let valuePhone = { val: null };
    await read("/Booking/" + bookingID + "/Account", valueUsername);
    setCTVName(valueUsername.val);
    await read(
      "/User_management/" + valueUsername.val + "/Account/Phone/",
      valuePhone
    );
    setCTVPhone(valuePhone.val);
  };

  const handleMoreUpPress = (bookingId) => {
    setSelectedBookingId(bookingId);
    getCTVPhone(bookingId);
    setIsModalUpVisible(true);
  };

  const create = (path, name, value) => {
    set(ref(database, path + name), value);
  };

  const handleAcceptcoming = async () => {
    var valueUser = { val: null };
    await read(
      "/Booking/" + selectedBookingId.toString() + "/IDUser",
      valueUser
    );
    console.log(valueUser.val);

    Alert.alert("Khách hàng đã đến nơi?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          create(
            "/Booking/" + selectedBookingId.toString() + "/",
            "Status",
            "Arrival"
          );
          create(
            "/User_management/" +
              ctvName +
              "/Account/Booking/" +
              valueUser.val +
              "/",
            "Status",
            "Arrival"
          );
          Alert.alert("Xác nhận đơn thành công");
          setCTVName("");
          setCTVPhone("");
        },
      },
    ]);
  };

  const handleAccept = async () => {
    var valueUser = { val: null };
    await read(
      "/Booking/" + selectedBookingId.toString() + "/IDUser",
      valueUser
    );
    console.log(valueUser.val);

    Alert.alert("Bạn có muốn xác nhận đơn?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          create(
            "/Booking/" + selectedBookingId.toString() + "/",
            "Status",
            "Coming"
          );
          create(
            "/User_management/" +
              ctvName +
              "/Account/Booking/" +
              valueUser.val +
              "/",
            "Status",
            "Arrival"
          );
          Alert.alert("Xác nhận đơn thành công");
          setCTVName("");
          setCTVPhone("");
        },
      },
    ]);
  };

  const handleCancel = async () => {
    var valueUser = { val: null };
    await read(
      "/Booking/" + selectedBookingId.toString() + "/IDUser",
      valueUser
    );
    console.log(valueUser.val);

    Alert.alert("Bạn có chắc chắn muốn hủy đơn không?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          create(
            "/Booking/" + selectedBookingId.toString() + "/",
            "Status",
            "Cancel"
          );
          create(
            "/User_management/" +
              ctvName +
              "/Account/Booking/" +
              valueUser.val +
              "/",
            "Status",
            "Cancel"
          );
          Alert.alert("Xác nhận hủy đơn thành công");
          setCTVName("");
          setCTVPhone("");
        },
      },
    ]);
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

            <ImageBackground
              source={require("../assets/images/tra.png")}
              style={{ width: "100%", height: 115 }}
            ></ImageBackground>
          </View>

      

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
              {Object.keys(listBooking)
                .filter((bookingKey) => bookingKey !== "Value")
                .filter(
                  (bookingKey) => listBooking[bookingKey].Status !== "Purchase"
                )
                .sort((a, b) => {
                  // Hàm so sánh cho việc sắp xếp theo trạng thái ưu tiên và sau đó theo thời gian từ mới nhất đến cũ nhất
                  const statusA = listBooking[a].Status;
                  const statusB = listBooking[b].Status;

                  // Chỉ số ưu tiên của trạng thái
                  const statusPriority = {
			Still: 4,
                    Coming: 0,
                    Arrival: 1,
                    Purchase: 2,
                    Cancel: 3,
                  };

                  // So sánh trạng thái theo ưu tiên
                  if (statusPriority[statusA] !== statusPriority[statusB]) {
                    return statusPriority[statusA] - statusPriority[statusB];
                  }
                })
                .map((bookingKey) => {
                  let backgroundColor = "white"; // Màu mặc định là trắng
                  // Kiểm tra trạng thái và thiết lập màu tương ứng
                  switch (listBooking[bookingKey].Status) {
                    case "Coming":
                      backgroundColor = "#7F7F7F";
                      break;
                    case "Arrival":
                      backgroundColor = "#FFD700"; // Màu vàng
                      break;
                    case "Purchase":
                      backgroundColor = "#7AE582"; // Màu xanh lá cây
                      break;
                    case "Cancel":
                      backgroundColor = "#c65d5a"; // Màu đỏ
                      break;                    
		case "Still":
                      backgroundColor = "#f9f9f9";
                      break;
                    default:
                      backgroundColor = "#f9f9f9";
                  }
                  return (
                    <View
                      style={[
                        styles.item,
                        { backgroundColor: backgroundColor },
                      ]}
                      key={bookingKey}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.title}>
                          {listBooking[bookingKey].Hub}
                        </Text>
                        <Text style={styles.title}>
                          {listBooking[bookingKey].Account}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => handleMoreUpPress(bookingKey)}
                        style={styles.moreButton}
                      >
                        <Text style={styles.moreButtonText}>More</Text>
                        {/* Icon cho nút More có thể thêm vào đây */}
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </GestureHandlerScrollView>
          </View>

          <Text style={[styles.br_40]}></Text>

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
                {selectedBookingId && listBooking[selectedBookingId].Account}
              </Text>
              <Text style={styles.userEmailModal}>{ctvPhone}</Text>

              <View style={{ flex: 1 }}>
                {/* sửa biến ở đây */}
                <View style={[styles.containerDropDown]}>
                  <ReadOnlyField
                    label="Đơn tại:"
                    value={
                      selectedBookingId && listBooking[selectedBookingId].Hub
                    }
                  />
                </View>

                <View style={[styles.containerDropDown]}>
                  <ReadOnlyField
                    label="Tên khách hàng:"
                    value={
                      selectedBookingId && listBooking[selectedBookingId].Name
                    }
                  />
                </View>

                <View style={[styles.containerDropDown]}>
                  <ReadOnlyField
                    label="SĐT liên hệ:"
                    value={
                      selectedBookingId && listBooking[selectedBookingId].Phone
                    }
                  />
                </View>

                <View style={[styles.containerDropDown]}>
                  <ReadOnlyField
                    label="Số lượng khách:"
                    value={
                      selectedBookingId &&
                      listBooking[selectedBookingId].Quantity
                    }
                  />
                </View>

                <View style={[styles.containerDropDown]}>
                  <ReadOnlyField
                    label="Thời gian (vd:23h-10/04/2024):"
                    value={
                      selectedBookingId && listBooking[selectedBookingId].Time
                    }
                  />
                </View>

                <View style={[styles.containerDropDown]}>
                  <ReadOnlyField
                    label="Ghi chú:"
                    value={
                      selectedBookingId && listBooking[selectedBookingId].Note
                    }
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleAccept} // Call handlePress when button is pressed
                    style={[styles.buttonModal, { backgroundColor: "#009470" }]}
                  >
                    <Text style={styles.modalButtonText}>Xác nhận</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleCancel}
                    style={[styles.buttonModal, { backgroundColor: "red" }]}
                  >
                    <Text style={styles.modalButtonText}>Hủy</Text>
                  </TouchableOpacity>



                  <TouchableOpacity
                    onPress={handleAcceptcoming} // Call handlePress when button is pressed
                    style={[styles.buttonModal, { backgroundColor: "#009470" }]}
                  >
                    <Text style={styles.modalButtonText}>Đã đến</Text>
                  </TouchableOpacity>

                </View>
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></View>
            </View>
          </Modal>
        </GestureHandlerScrollView>
      </GestureHandlerRootView>
    </>
  );
}
