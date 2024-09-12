import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  nativeEvent,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Carousel = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();
  const navigation = useNavigation();
  const carouselData = [
    {
      id: "01",
      image: require("../assets/images/DSC00200.jpg"),
    },
    {
      id: "02",
      image: require("../assets/images/DSC00593.jpg"),
    },
    {
      id: "03",
      image: require("../assets/images/DSC00791.jpg"),
    },
  ];

  const getItemLayout = (data, index) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index: index,
  });

  //Auto scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex.toFixed() == carouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
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
          navigation.navigate("InfoPage1");
          break;
        case 1:
          navigation.navigate("InfoPage2");
          break;
        case 2:
          navigation.navigate("InfoPage3");
          break;
        default:
          break;
      }
    };
  
    return (
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={item.image}
          style={{
            height: windowHeight,
            width: windowWidth,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderDotIndicator = () => {
    return carouselData.map((dot, index) => {
      if (activeIndex.toFixed() == index) {
        return <View key={index} style={styles.dotActive}></View>;
      } else {
        return <View key={index} style={styles.dot}></View>;
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.roomText}>Phòng KARAOKE nhỏ</Text>
        <View style={styles.dotIndicator}>{renderDotIndicator()}</View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.buttonContainer}
        >
          <Text style={styles.createButton}>Đăng kí tài khoản</Text>
        </TouchableOpacity>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.alreadyText}>Đăng nhập</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  textContainer: {
    position: "relative",
    bottom: 20,
    left: 20,
  },
  roomText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    padding: 26,
  },
  infoContainer: {
    backgroundColor: "black",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
  },
  createButton: {
    fontSize: 26,
    color: "#003366",
    fontWeight: "bold",
    alignSelf: "center",
  },
  alreadyText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  dotIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  dot: {
    backgroundColor: "white",
    height: 5,
    width: 5,
    borderRadius: 2.5,
    marginHorizontal: 10,
  },
  dotActive: {
    backgroundColor: "red",
    height: 5,
    width: 5,
    borderRadius: 2.5,
    marginHorizontal: 10,
  },
});

export default Carousel;
