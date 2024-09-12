import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";

import {
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Image,
  Modal,
  Alert,
} from "react-native";
import styles from "./css/FormUserStyle";
import {
  GestureHandlerRootView,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

export default function UserForm({ route }) {
  // TẠO 1 HÀM GET USER_NAME TỪ ĐĂNG NHẬP, RÚT TIỀN ĐỂ GỬI CHO MONACO VỚI SWIPEABLE LÀ XONG

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const handleToggleForm = () => {
    setShowForm(!showForm); // Đảo ngược trạng thái hiển thị form
  };
  const handleToggleForm2 = () => {
    setShowForm2(!showForm2); // Đảo ngược trạng thái hiển thị form
  };
  const karaokeOption1 = () => {
    console.log("Karaoke Monaco 235 Lê Đức Thọ");
    navigation.navigate("InfoPage1", { inputText: user_name });
    // Xử lý khi chọn tùy chọn Karaoke 1
  };

  const karaokeOption2 = () => {
    console.log("Karaoke Option 2");
    // Xử lý khi chọn tùy chọn Karaoke 2
    navigation.navigate("InfoPage2", { inputText: user_name });
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();

  const navigation = useNavigation();

  const { inputText } = route.params;

  const [user_name, setUserName] = useState(inputText);

  useEffect(() => {
    handleRead();
    donHangTichLuy();
  }, [inputText]);

  const handlePress = () => {
    console.log("Button pressed");
    // Xử lý các hành động khi nút được nhấn ở đây
  };
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
  // Đặt hàng
  const [text1, co_so] = useState("");
  const [text2, ten_khach_hang] = useState("");
  const [text3, so_dien_thoai] = useState("");
  const [text4, thoi_gian_1] = useState("");
  const [text5, thoi_gian_2] = useState("");

  const [folderList, setFolderList] = useState([]);

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

  const handleRead = async () => {
    try {
      var values = { val: null };
      await read("Folder/Value", values); // Will contain the value after reading from the database
      // Do something with the input values

      const snapshotFolder = await get(ref(database, "Folder"));
      if (snapshotFolder.exists()) {
        const folderData = snapshotFolder.val();
        // Convert the object keys to an array of objects
        const folderArray = Object.keys(folderData).map((key) => ({
          key,
          ...folderData[key],
        }));

        // Take only the first three objects
        const latestFolders = folderArray.slice(values.val - 3, values.val);

        setFolderList(latestFolders);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // user_management/username/'Account'/'Booking'/Value/co_so, time, value
  const [don_hang, setDonHang] = useState({ val: null });
  const [remain, Amount_remain] = useState({ val: null });
  const [total, set_total] = useState({ val: null });
  const [dataFetched, setDataFetched] = useState(false);

  const [isModalDownVisible, setIsModalDownVisible] = useState(false);
  const [ctvPhone, setCTVPhone] = useState("");
  const [ctvRemain, setCTVRemain] = useState(0);

  const [ctvName, setCTVName] = useState("");
  const [ctvBank, setCTVBank] = useState("");
  const [ctvSTK, setCTVSTK] = useState("");

  const [point, setPoint] = useState("");

  const donHangTichLuy = async () => {
    try {
      const donHangData = { val: null };
      const my_total = { val: null };
      await read(
        "User_management/" + user_name.toString() + "/Account/Booking",
        donHangData
      );
      await read(
        "User_management/" + user_name.toString() + "/Agency/",
        my_total
      );

      // Cập nhật state với dữ liệu mới
      setDonHang(donHangData);
      set_total(my_total);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!dataFetched) {
    return <ActivityIndicator />; // Hiển thị indicator khi đang fetch dữ liệu
  }

  const getItemLayout = (data, index) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index: index,
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const index = scrollPosition / windowWidth;

    setActiveIndex(index);
  };

  const renderItem = ({ item, index }) => {
    const handleImagePress = () => {
      // Navigate to the respective page based on the index or id of the item
      // Example: If index is 0, navigate to a page with information for the first image
      // You can replace this with your logic
      switch (index) {
        case 0:
          navigation.navigate("WebView1", { inputText: user_name });
          break;
        case 1:
          navigation.navigate("WebView2", { inputText: user_name });
          break;
        case 2:
          navigation.navigate("WebView3", { inputText: user_name });
          break;
        default:
          break;
      }
    };

    return (
      <View style={{ paddingHorizontal: 30 }}>
        {/* Thêm margin horizontal */}
        <View style={{ width: windowWidth - 60 }}>
          {/* Trừ đi tổng margin */}
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              source={{ uri: item.Image }}
              style={{
                height: 200,
                width: windowWidth - 60,
                borderRadius: 10, // Trừ đi tổng margin
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDotIndicator = () => {
    return folderList.map((dot, index) => {
      if (activeIndex.toFixed() == index) {
        return <View key={index} style={[styles.dot, styles.dotActive]}></View>;
      } else {
        return <View key={index} style={styles.dot}></View>;
      }
    });
  };

  const getCTVPhone = async () => {
    let valuePhone = { val: null };
    await read("/User_management/" + user_name + "/Account/Phone/", valuePhone);
    setCTVPhone(valuePhone.val);
  };

  const getCTVCurrentPoint = async () => {
    let valueRemain = { val: null };
    await read(
      "/User_management/" + user_name + "/Agency/Amount_Remain/",
      valueRemain
    );
    setCTVRemain(valueRemain.val);
  };

  const handleMoreDownPress = () => {
    setIsModalDownVisible(true);
    getCTVPhone();
    getCTVCurrentPoint();
  };

  function create(path, name, value) {
    set(ref(database, path + name), value);
  }

  const handleWithdraw = async () => {
    if (point > ctvRemain - 200) {
      Alert.alert(
        "Số điểm nhập quá lớn (Cần tối thiểu 200 điểm để duy trì tài khoản)\nVui lòng nhập lại"
      );
    } else if (point == 0) {
      Alert.alert(
        "Số điểm nhập quá lớn (Cần tối thiểu 200 điểm để duy trì tài khoản)\nVui lòng nhập lại"
      );
    } else {
      var valuePayment = { val: null };
      await read("Payment/Value", valuePayment);
      var valuePaymentData = parseInt(valuePayment.val);
      if (valuePaymentData > 1000) {
        valuePaymentData = 0;
      }
      valuePaymentData += 1;

      try {
        create(
          "/Payment/" + valuePaymentData.toString() + "/",
          "Amount",
          point
        );
        create(
          "/Payment/" + valuePaymentData.toString() + "/",
          "Bank",
          ctvBank
        );
        create(
          "/Payment/" + valuePaymentData.toString() + "/",
          "Name",
          ctvName
        );
        create(
          "/Payment/" + valuePaymentData.toString() + "/",
          "Number",
          ctvSTK
        );
        create(
          "/Payment/" + valuePaymentData.toString() + "/",
          "Status",
          "Pending"
        );
        create(
          "/Payment/" + valuePaymentData.toString() + "/",
          "Username",
          user_name
        );
        create("/Payment/", "Value", valuePaymentData);

        Alert.alert("Đơn xác nhận rút tiền đã gửi thành công", "", [
          {
            text: "OK",
            onPress: () => {
              setIsModalDownVisible(false);
              resetForm();
            },
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetForm = () => {
    setCTVName("");
    setCTVBank("");
    setCTVSTK("");
    setPoint("");
  };

  return (
    <>
      <GestureHandlerRootView
        style={[styles.white, styles.width_100, styles.height_100]}
      >
        <GestureHandlerScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* header */}
          <View style={[styles.flex, styles.black]}>
            <Text style={[styles.br_60]}></Text>
            <Text style={[styles.br_10]}></Text>
            <ImageBackground
              source={require("../assets/logo.jpg")}
              style={styles.logo}
            ></ImageBackground>
            <Text style={[styles.br_60]}></Text>
            {/* swipeable */}
            <FlatList
              data={folderList}
              ref={flatlistRef}
              getItemLayout={getItemLayout}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              horizontal={true}
              pagingEnabled={true}
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
            />
            <Text style={[styles.br_20]}></Text>
            <View style={styles.dotIndicator}>{renderDotIndicator()}</View>
            <ImageBackground
              source={require("../assets/images/tra.png")}
              style={{ width: "100%", height: 115 }}
            ></ImageBackground>
          </View>

          {/* user */}
          <TouchableOpacity
            style={[styles.button, showForm && styles.activeButton]}
            onPress={handleToggleForm}
          >
            <Text style={[styles.buttonText]}>Karaoke </Text>
          </TouchableOpacity>

          {showForm && (
            <View style={styles.formContainer}>
             
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={karaokeOption1}
              >
                <Text style={styles.dropdownText}>
                  Karaoke Monaco 235 Lê Đức Thọ
                </Text>
                <Image
                  style={{
                    width: "100%",
                    height: 100,
                    marginTop: 5,
                    borderRadius: 10,
                  }}
                  source={require("../assets/images/DSC00593.jpg")}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, showForm2 && styles.activeButton]}
            onPress={handleToggleForm2}
          >
            <Text style={[styles.buttonText]}>Massage</Text>
          </TouchableOpacity>
          {showForm2 && (
            <View style={styles.formContainer}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={karaokeOption2}
              >
                <Text style={styles.dropdownText}>Massage Quý Ông</Text>
                <Image
                  style={{
                    width: "100%",
                    height: 100,
                    marginTop: 5,
                    borderRadius: 10,
                  }}
                  source={require("../assets/images/DSC00205.jpg")}
                />
              </TouchableOpacity>
            </View>
          )}

          <Text style={[styles.br_20]}></Text>

          {/* Đơn hàng tích lũy */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>
            Đơn hàng tích lũy
          </Text>

          <Text style={[styles.br_20]}></Text>
          <View style={styles.orderContainer}>
            <GestureHandlerScrollView
              style={styles.scrollViews}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {don_hang.val &&
                Object.keys(don_hang.val)
                  .filter((key) => key !== "Value")
                  .sort((a, b) => {
                    // Hàm so sánh cho việc sắp xếp theo trạng thái ưu tiên và sau đó theo thời gian từ mới nhất đến cũ nhất
                    const statusA = don_hang.val[a].Status;
                    const statusB = don_hang.val[b].Status;

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
                  .map((key) => {
                    let backgroundColor = "white"; // Màu mặc định là trắng

                    // Kiểm tra trạng thái và thiết lập màu tương ứng


                    return (
                      <View key={key} style={[styles.flex]}>
                        <Text style={[styles.br_10]}></Text>
                        <View
                          style={[
                            styles.block,
                            {
                              width: "100%",
                              backgroundColor: backgroundColor, // Sử dụng màu được thiết lập từ trạng thái
                            },
                          ]}
                        >
                          <Text style={styles.top_right}>
                            ${don_hang.val[key].Amount}
                          </Text>
                          <Text style={styles.text}>
                            {don_hang.val[key].Hub}
                          </Text>
                          <Text style={styles.text}>
                            {don_hang.val[key].Name}
                          </Text>
                          <Text style={styles.text}>
                            {don_hang.val[key].Time.slice(0, 19)}
                          </Text>
                        </View>
                        <Text style={[styles.br_10]}></Text>
                      </View>
                    );
                  })}
            </GestureHandlerScrollView>
          </View>


   <View style={{
      flex: 1,
      backgroundColor: '#f8f8f8',
      padding: 20,
    }}>
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#333',
        }}>Thông tin người dùng</Text>
        <Text style={{
          fontSize: 18,
          marginBottom: 5,
          color: '#666',
        }}>Tên người dùng:</Text>
        <Text style={{
          fontSize: 20,
          color: '#333',
        }}>{user_name}</Text>
        <Text style={{
          fontSize: 18,
          marginBottom: 5,
          color: '#666',
        }}>Cấp độ hiện tại:</Text>
        <Text style={{
          fontSize: 20,
          color: '#333',
        }}>Phổ thông</Text>
<View style={styles.container_inside}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.firstButton]}
                onPress={handlePress}
              >
                <Text style={[styles.buttonText]}>
                  Tiền hiện tại: {total.val.Amount_Remain}{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondButton]}
                onPress={handleMoreDownPress}
              >
                <Text style={[styles.buttonText]}>Rút tiền</Text>
              </TouchableOpacity>
            </View>
          </View>
 <Text style={[styles.br_40]}></Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>
            Mã QR của tôi
          </Text>
          <Text style={[styles.br_20]}></Text>
          <View style={styles.flex}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <QRCode
                value={`https://bookingshit-3c16d.web.app/?xxx=${user_name}`} // the string you want to encode as QR code
                size={200} // adjust the size of the QR code
              />
            </View>
          </View>
          <Text style={[styles.br_30]}></Text>

      </View>
    </View>

          
          <Modal
            visible={isModalDownVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <GestureHandlerScrollView>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsModalDownVisible(false)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Thông tin thanh toán</Text>

                {/* Add your modal content here */}
                <Text style={{ height: 10 }}></Text>
                <ImageBackground
                  source={require("../assets/logo.jpg")}
                  style={styles.avatar}
                />
                <Text style={styles.userNameModal}>{user_name}</Text>
                <Text style={styles.userEmailModal}>{ctvPhone}</Text>

                <View style={styles.formContainer}>
                  <Text style={{ padding: 10, fontSize: 16, marginLeft: 2 }}>
                    Tên:
                  </Text>
                  <View style={[styles.containerDropDown]}>
                    <TextInput
                      onChangeText={setCTVName}
                      style={[styles.detailInput, { width: "90%" }]}
                      placeholder="cả họ và tên"
                    />
                  </View>
                </View>

                <View style={styles.formContainer}>
                  <Text style={{ padding: 10, fontSize: 16, marginLeft: 2 }}>
                    Ngân hàng:
                  </Text>
                  <View style={[styles.containerDropDown]}>
                    <TextInput
                      onChangeText={setCTVBank}
                      style={[styles.detailInput, { width: "90%" }]}
                      placeholder="Chi nhánh"
                    />
                  </View>
                </View>

                <View style={styles.formContainer}>
                  <Text style={{ padding: 10, fontSize: 16, marginLeft: 2 }}>
                    STK
                  </Text>
                  <View style={[styles.containerDropDown]}>
                    <TextInput
                      style={[styles.detailInput, { width: "90%" }]}
                      onChangeText={setCTVSTK}
                    />
                  </View>
                </View>

                <View style={{ marginVertical: "5%" }}>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    Tổng số điểm muốn rút
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
                    onChangeText={setPoint}
                    textAlign="center"
                    style={{ fontSize: 30 }}
                  ></TextInput>
                </View>

                <Text style={{ height: 20 }}></Text>
                <TouchableOpacity
                  onPress={handleWithdraw}
                  style={[styles.buttonModal, { backgroundColor: "#009470" }]}
                >
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ height: 330 }}></Text>
            </GestureHandlerScrollView>
          </Modal>
        </GestureHandlerScrollView>
      </GestureHandlerRootView>
    </>
  );
}