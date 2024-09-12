import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Carousel from "./components/Carousel";
import Start from "./components/Start";
import Register from "./components/Register";
import AdminForm from "./components/AdminForm";
import KetoanForm from "./components/KetoanForm";
import LetanForm from "./components/LetanForm";
import DailiForm from "./components/DailiForm";
import UserForm from "./components/UserForm";
import InfoPage1 from "./components/InfoPage1";
import InfoPage2 from "./components/InfoPage2";
import InfoPage11 from "./components/InfoPage11";
import InfoPage3 from "./components/InfoPage3";
import InfoPage22 from "./components/InfoPage22";
import FormView from "./components/FormView";
import WebView1 from "./components/WebView1";
import WebView2 from "./components/WebView2";
import WebView3 from "./components/WebView3";
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormView"
          component={FormView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebView1"
          component={WebView1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebView2"
          component={WebView2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebView3"
          component={WebView3}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Carousel"
          component={Carousel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminForm"
          component={AdminForm}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CTVForm"
          component={UserForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage1"
          component={InfoPage1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage2"
          component={InfoPage2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage11"
          component={InfoPage11}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage22"
          component={InfoPage22}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage3"
          component={InfoPage3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KetoanForm"
          component={KetoanForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LetanForm"
          component={LetanForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DailiForm"
          component={DailiForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const style = StyleSheet.create({});
