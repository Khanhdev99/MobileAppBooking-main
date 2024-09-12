import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useNavigation } from "@react-navigation/native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

const FormView = () => {
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

  const [image, setImage] = useState("");
  const [webUri, setWebUri] = useState("");
  const imageInputRef = useRef(null);
  const webUriInputRef = useRef(null);

  const [folderList, setFolderList] = useState([]);

  function create(path, name, value) {
    set(ref(database, path + name), value);
  }

  const add = async () => {
    var values = { val: null };
    await read("Folder/Value", values);
    console.log(values.val); // Will contain the value after reading from the database
    // Do something with the input values
    var value = values.val;
    if (value > 1000) {
      value = 0;
    }
    value += 1;
    if (image && webUri) {
      console.log(image + webUri);
      create("/Folder/" + value.toString() + "/", "Image", image);
      create("/Folder/" + value.toString() + "/", "Uri", webUri);
      create("/Folder/", "Value", value);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);

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
      await read("Folder/Value", values);
      console.log(values.val); // Will contain the value after reading from the database
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
        console.log(latestFolders);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Ẩn bàn phím
  };

  const handleContainerPress = () => {
    dismissKeyboard(); // Ẩn bàn phím khi bấm ra ngoài ô input
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();

  const getItemLayout = (data, index) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index: index,
  });

  //Auto scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex.toFixed() == folderList.length - 1) {
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
          navigation.navigate("WebView1");
          break;
        case 1:
          navigation.navigate("WebView2");
          break;
        case 2:
          navigation.navigate("WebView3");
          break;
        default:
          break;
      }
    };

    return (
      <View>
        {/* Thêm margin horizontal */}
        <View>
          {/* Trừ đi tổng margin */}
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              source={{ uri: item.Image }}
              style={{
                marginTop: 50,
                height: 500,
                width: windowWidth,
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

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container}>
        <FlatList
          data={folderList}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.dotIndicator}>{renderDotIndicator()}</View>
        <Text>Image URL</Text>
        <TextInput
          ref={imageInputRef}
          value={image}
          onChangeText={setImage}
          style={styles.input}
          onFocus={() => {
            webUriInputRef.current.blur(); // Ẩn bàn phím khi focus vào ô input khác
          }}
        ></TextInput>
        <Text style={{ height: 20 }}></Text>
        <Text>Web URL</Text>
        <TextInput
          ref={webUriInputRef}
          value={webUri}
          onChangeText={setWebUri}
          style={styles.input}
          onFocus={() => {
            imageInputRef.current.blur(); // Ẩn bàn phím khi focus vào ô input khác
          }}
        ></TextInput>
        <Text style={{ height: 20 }}></Text>
        <TouchableOpacity style={styles.button} onPress={add}>
          <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("WebView1")}
        >
          <Text>WebView1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("WebView2")}
        >
          <Text>WebView2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("WebView3")}
        >
          <Text>WebView3</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    width: "80%",
    height: 40,
  },
  button: {
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
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
});

export default FormView;
