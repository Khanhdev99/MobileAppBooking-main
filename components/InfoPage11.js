import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

import DatePickerComponent from "../DatePickerComponent";
export default function InfoPage1({ route }) {
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

  const navigation = useNavigation();

  const { inputText } = route.params;
  const username = inputText;

  const handleBackPress = () => {
    navigation.navigate("DailiForm", { inputText: username });
  };

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [hour, setHour] = useState("");
  const [date, setDate] = useState("");
  const [guestQuantity, setGuestQuantity] = useState("");
  const [note, setNote] = useState("");

  const handleReset = () => {};

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function create(path, name, value) {
    set(ref(database, path + name), value);
  }

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

  const booking = async () => {
    var valueBooking = { val: null };
    var valueUser = { val: null };
var referrer = {val: null};
var referrer_second = {val:null};
    await read("Booking/Value", valueBooking);
    await read(
      "/User_management/" + username.toString() + "/Account/Booking/Value",
      valueUser
    );
    await read(
      "/User_management/" + username.toString() + "/Referrer",
      referrer
    );
    await read(
      "/User_management/" + referrer.val.toString() + "/Referrer",
      referrer_second
    );
console.log("DITMEMAY"+referrer.val);
    console.log(valueBooking.val); // Will contain the value after reading from the database
    console.log(valueUser.val);
    // Check value Booking
    var valueBookingData = parseInt(valueBooking.val);
    if (valueBookingData > 1000) {
      valueBookingData = 0;
    }
    valueBookingData += 1;
    // Check value User_management
    var valueUserData = parseInt(valueUser.val);
    if (valueUserData > 1000) {
      valueUserData = 0;
    }
    valueUserData += 1;
    if (
      guestName &&
      guestPhone &&
      hour &&
      selectedDate.toString() &&
      guestQuantity &&
      note
    ) {
      try {
        // Add to Booking
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Account",
          username.toString()
        );
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Hub",
          "Karaoke"
        );
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Name",
          guestName
        );
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Phone",
          guestPhone
        );
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Quantity",
          guestQuantity
        );
        create("/Booking/" + valueBookingData.toString() + "/", "Note", note);
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Time",
          hour + " " + selectedDate.toString()
        );
        create("/Booking/" + valueBookingData.toString() + "/", "Amount", 0);
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "Status",
          "Coming"
        );
        create(
          "/Booking/" + valueBookingData.toString() + "/",
          "IDUser",
          parseInt(valueUser.val) + 1
        );

        create("/Booking/", "Value", valueBookingData);

        // Add to User_management
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Account",
          username.toString()
        );

        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Hub",
          "Karaoke"
        );

        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Name",
          guestName
        );
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Phone",
          guestPhone
        );
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Quantity",
          guestQuantity
        );
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Note",
          note
        );
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Time",
          hour + " " + selectedDate.toString()
        );
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Amount",
          "0"
        );
        create(
          "/User_management/" +
            username.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Status",
          "Coming"
        );
        create(
          "/User_management/" + username.toString() + "/Account/Booking/",
          "Value",
          valueUserData.toString()
        );

        // Add to Referrer
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Account",
          username.toString()
        );

        create(
          "/User_management/" +
            referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Hub",
          "Karaoke"
        );

        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Name",
          guestName
        );
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Phone",
          guestPhone
        );
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Quantity",
          guestQuantity
        );
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Note",
          note
        );
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Time",
          hour + " " + selectedDate.toString()
        );
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Amount",
          "0"
        );
        create(
          "/User_management/" +
             referrer.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Status",
          "Coming"
        );
        create(
          "/User_management/" +  referrer.val.toString() + "/Account/Booking/",
          "Value",
          valueUserData.toString()
        );

        // Add to Referrer_second
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Account",
          username.toString()
        );

        create(
          "/User_management/" +
            referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Hub",
          "Karaoke"
        );

        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Name",
          guestName
        );
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Phone",
          guestPhone
        );
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Quantity",
          guestQuantity
        );
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Note",
          note
        );
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Time",
          hour + " " + selectedDate.toString()
        );
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Amount",
          "0"
        );
        create(
          "/User_management/" +
             referrer_second.val.toString() +
            "/Account/Booking/" +
            valueUserData.toString() +
            "/",
          "Status",
          "Coming"
        );
        create(
          "/User_management/" +  referrer_second.val.toString() + "/Account/Booking/",
          "Value",
          valueUserData.toString()
        );




        // Display Alert after all operations completed
        Alert.alert(
          "Đơn hàng đã được gửi lên hệ thống \n Xin hãy chờ để được xác nhận"
        );
      } catch (error) {
        console.error("Error occurred:", error);
        // Handle error if needed
      }
    }
  };

  return (
    <>
      <Text style={{ height: 30, backgroundColor: "#DCDCDC" }}></Text>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handleBackPress} style={styles.flex_row}>
          <AntDesign name="arrowleft" size={24} color="black" />
          {/* Icon "Back" */}
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Đặt hàng */}


        <Text style={styles.header}>Nuru đẳng cấp bậc nhất Hà Nội</Text>
        <Image
          source={require("../assets/images/DSC00194.jpg")} // Assume quyong.jpg is the image file in the same directory
          style={styles.image}
        />

        <Text style={styles.paragraph}>
          Năm 2019, Massage Quý Ông chính thức đi vào hoạt động, đại diện cho
          một trong những cơ sở Massage đứng top đầu Hà Nội về sự sang trọng và
          đẳng cấp. Tọa lạc tại vị trí đắc địa tại con phố sầm uất Lê Đức Thọ
          quận Nam Từ Liêm, thành phố Hà Nội.
        </Text>
        <Text style={styles.header}>Qúy Ông Massage</Text>
        <Image
          source={require("../assets/images/DSC00212.jpg")} // Assume quyong.jpg is the image file in the same directory
          style={styles.image}
        />
        <Text style={styles.paragraph}>
          Cơ sở Massage Quý Ông sở hữu chỗ để xe rộng rãi, giao thông thuận
          tiện. Với quy mô đầu tư cực khủng lên đến 40 phòng, thiết kế đồng bộ
          đông ấm hè thoáng mát, tiện ích đầy đủ cho các dịch vụ chăm sóc sức
          khỏe như xông hơi thảo dược, bồn ngâm lá người Dao, bể sục sữa, giường
          massage thiết kế chuyên biệt…Hệ thống phòng pool party thiết kế độc
          đáo, bể bơi 4 mùa lưu thông sạch sẽ. Cơ sở Quý Ông chúng tôi tự tin là
          nơi duy nhất có được tầm “View triệu đô”- 4 mặt tiền thoáng đãng, mang
          đến cho Quý khách trải nghiệm sức khỏe tinh thần và thể chất.
        </Text>
        <Image
          source={require("../assets/images/DSC00205.jpg")} // Assume quyong.jpg is the image file in the same directory
          style={styles.image}
        />
        <Text style={styles.paragraph}>
          Ngay từ thời điểm đặt chân đến cơ sở, khu vực sảnh tiếp đón lớn, Quý
          khách dễ dàng trải nghiệm không gian sang trọng, riêng tư. Quý Ông
          Massage tinh tế bố trí ghế chờ thư giãn thoải mái cùng với đồ uống
          chào mừng cho Quý khách trong thời gian nán lại sảnh.
        </Text>
        <Image
          source={require("../assets/images/DSC00198.jpg")} // Assume quyong.jpg is the image file in the same directory
          style={styles.image}
        />
        <Text style={styles.paragraph}>
          Với phương châm “chiều khách hơn chiều người yêu”, Cơ sở chúng tôi
          luôn biết rằng điểm nhấn quan trọng nhất chính là đội ngũ KTV, vì vậy
          viêc đầu tư vào khâu tuyển chọn kỹ lưỡng ban đầu, đào tạo chuyên sâu
          bài bản về kỹ thuật mát xa truyền thống cũng như đáp ứng nhu cầu thư
          giãn và đặc biệt luôn đổi mới là tiêu chí hàng đầu của Quý Ông
          massage.
        </Text>
        <Image
          source={require("../assets/images/DSC00227.jpg")} // Assume quyong.jpg is the image file in the same directory
          style={styles.image}
        />
        <Text style={styles.paragraph}>
          Bên cạnh đó, với đội ngũ chuyên viên tư vấn kinh nghiệm dày dạn sẽ
          luôn lắng nghe và thấu hiểu Quý khách “như tri kỷ”, có thể thiết kế
          đúng Gu các nhu cầu, kể cả khắt khe nhất. Ngay từ thời điểm ra mắt đến
          nay, Massage Quý ông luôn tự hào vì đã chu đáo đón tiếp hàng nghìn
          lượt khách trong nước và nước ngoài, các đoàn khách du lịch, công tác
          lớn nhỏ.... Chúng tôi cam kết mang lại trải nghiệm thư giãn đẳng cấp
          nhất, mang lại phong độ sức khỏe tốt nhất cho các Quý Ông sau những
          khoảng thời gian làm việc căng thẳng.
        </Text>

        <Text style={{ height: 100 }}></Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 350,
    height: 170,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  scrollViews: {
    width: "90%",
    height: 400,
  },
  input: {
    height: 50,

    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: "black", // Màu của border
    borderWidth: 1, // Độ dày của border
  },
  input_new: {
    flex: 1,
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
    borderColor: "black", // Màu của border
    borderWidth: 1, // Độ dày của border
  },
  flex_row: {
    flexDirection: "row",
  },
  container_inside: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row", // Hiển thị các button theo hàng ngang
    paddingHorizontal: 15, // Khoảng cách giữa các nút
  },
  button: {
    backgroundColor: "#009470",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#DCDCDC",
  },
  backButtonText: {
    marginLeft: 5,
  },
});
