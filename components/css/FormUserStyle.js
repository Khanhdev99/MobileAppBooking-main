import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  br_40: {
    height: 40,
  },
  br_30: {
    height: 30,
  },
  br_20: {
    height: 20,
  },
  br_10: {
    height: 10,
  },
  br_60: {
    height: 60,
  },
  flex: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flex_row: {
    flexDirection: "row",
  },
  flex_column: {
    flexDirection: "column",
  },
  white: {
    backgroundColor: "#fff",
  },
  black: {
    backgroundColor: "black",
  },
  width_100: {
    width: "100%",
  },
  height_100: {
    height: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    marginHorizontal: "1%",
    flex: 1,
    width: "50%",
  },
  dropdownText: {
    fontSize: 16,
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
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  secondButton: {
    backgroundColor: "green", // Màu của button thứ hai
    width: "27%",
  },
  firstButton: {
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollViews: {
    width: "90%",
    height: 400,
    marginLeft: "5%",
  },
  top_right: {
    position: "absolute", // Sử dụng vị trí tuyệt đối
    top: 5, // Đặt vị trí của văn bản ở trên cùng của block
    right: 5, // Đặt vị trí của văn bản ở phía bên phải của block
  },
  block: {
    borderWidth: 2, // Độ dày của border
    borderColor: "black", // Màu của border
    borderRadius: 10, // Độ cong của border
    paddingHorizontal: 70, // Khoảng cách giữa border và văn bản
    paddingVertical: 15, // Khoảng cách giữa border và văn bản
  },
  text: {
    textAlign: "center", // Canh giữa văn bản
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
  dotIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  dot: {
    backgroundColor: "#D9D9D9",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: "#CE2B2B",
    width: 25,
  },
  orderContainer: {
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: "5%",
    padding: "2%",
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  buttonModal: {
    paddingVertical: 15, // Độ cao của nút chấp nhận
    paddingHorizontal: 40, // Độ rộng của nút chấp nhận
    borderRadius: 5, // Độ cong góc của nút chấp nhận
  },
  modalButtonText: { fontSize: 18, color: "white", fontWeight: "bold" },
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  containerDropDown: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "auto", // Di chuyển modal xuống dưới cùng của màn hình
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "67%", // Chiếm khoảng 2/3 màn hình từ dưới lên
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 25,
  },
  avatar: {
    height: 70,
    width: 70,
    marginTop: 2,
  },
  userNameModal: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmailModal: {
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "auto", // Di chuyển modal xuống dưới cùng của màn hình
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "67%", // Chiếm khoảng 2/3 màn hình từ dưới lên
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 25,
  },
  userNameModal: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmailModal: {
    fontSize: 15,
  },
  detailInput: {
    left: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    width: "88%",
    backgroundColor: "#E7E7E7",
    borderRadius: 5,
  },
});

export default styles;
