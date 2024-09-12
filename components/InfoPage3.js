import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Image ,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const InfoPage3 = () => {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [address, setAddress] = React.useState("");

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.header}>Nuru đẳng cấp bậc nhất Hà Nội</Text>
       <Image
        source={require("../assets/images/DSC00194.jpg")} // Assume quyong.jpg is the image file in the same directory
        style={styles.image}
      />
       
      <Text style={styles.paragraph}>
        Năm 2019, Massage Quý Ông chính thức đi vào hoạt động, đại diện cho một trong những cơ sở Massage đứng top đầu Hà Nội về sự sang trọng và đẳng cấp. Tọa lạc tại vị trí đắc địa tại con phố sầm uất Lê Đức Thọ quận Nam Từ Liêm, thành phố Hà Nội.
      </Text>
      <Text style={styles.header}>Qúy Ông Massage</Text>
      <Image
        source={require("../assets/images/DSC00212.jpg")} // Assume quyong.jpg is the image file in the same directory
        style={styles.image}
      />
      <Text style={styles.paragraph}>
        Cơ sở Massage Quý Ông sở hữu chỗ để xe rộng rãi, giao thông thuận tiện. Với quy mô đầu tư cực khủng lên đến 40 phòng, thiết kế đồng bộ đông ấm hè thoáng mát, tiện ích đầy đủ cho các dịch vụ chăm sóc sức khỏe như xông hơi thảo dược, bồn ngâm lá người Dao, bể sục sữa, giường massage thiết kế chuyên biệt…Hệ thống phòng pool party thiết kế độc đáo, bể bơi 4 mùa lưu thông sạch sẽ. Cơ sở Quý Ông chúng tôi tự tin là nơi duy nhất có được tầm “View triệu đô”-  4 mặt tiền thoáng đãng, mang đến cho Quý khách trải nghiệm sức khỏe tinh thần và thể chất.
      </Text>
      <Image
        source={require("../assets/images/DSC00205.jpg")} // Assume quyong.jpg is the image file in the same directory
        style={styles.image}
      />
      <Text style={styles.paragraph}>
        Ngay từ thời điểm đặt chân đến cơ sở, khu vực sảnh tiếp đón lớn, Quý khách dễ dàng trải nghiệm không gian sang trọng, riêng tư. Quý Ông Massage tinh tế bố trí ghế chờ thư giãn thoải mái cùng với đồ uống chào mừng cho Quý khách trong thời gian nán lại sảnh.
      </Text>
      <Image
        source={require("../assets/images/DSC00198.jpg")} // Assume quyong.jpg is the image file in the same directory
        style={styles.image}
      />
      <Text style={styles.paragraph}>
        Với phương châm “chiều khách hơn chiều người yêu”, Cơ sở chúng tôi luôn biết rằng điểm nhấn quan trọng nhất chính là đội ngũ KTV, vì vậy viêc đầu tư vào khâu tuyển chọn kỹ lưỡng ban đầu, đào tạo chuyên sâu bài bản về kỹ thuật mát xa truyền thống cũng như đáp ứng nhu cầu thư giãn và đặc biệt luôn đổi mới là tiêu chí hàng đầu của Quý Ông massage.
      </Text>
      <Image
        source={require("../assets/images/DSC00227.jpg")} // Assume quyong.jpg is the image file in the same directory
        style={styles.image}
      />
      <Text style={styles.paragraph}>
        Bên cạnh đó, với đội ngũ chuyên viên tư vấn kinh nghiệm dày dạn sẽ luôn lắng nghe và thấu hiểu Quý khách “như tri kỷ”, có thể thiết kế đúng Gu các nhu cầu, kể cả khắt khe nhất. Ngay từ thời điểm ra mắt đến nay, Massage Quý ông luôn tự hào vì đã chu đáo đón tiếp hàng nghìn lượt khách trong nước và nước ngoài, các đoàn khách du lịch, công tác lớn nhỏ.... Chúng tôi cam kết mang lại trải nghiệm thư giãn đẳng cấp nhất, mang lại phong độ sức khỏe tốt nhất cho các Quý Ông sau những khoảng thời gian làm việc căng thẳng.
      </Text>
     
     
     
      
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      marginTop: 50,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
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
  });

export default InfoPage3;
