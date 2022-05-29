import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Button, View } from "react-native";
import { setuserDetails } from "../redux/userDetailsSlice";
import { setIsLogout } from "../redux/isLoginSlice";
import BottomTabNavigator from "./BottomTabNavigator";
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const isLogin = useSelector((state) => state.reducerIsLogin.isLogin);
  return (
    <>
      <Drawer.Navigator
        drawerContent={() => <CustomDrawer />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: "25%" },
        }}
      >
        <Drawer.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="Logout"
          component={isLogin ? HomeScreen : LoginScreen}
        />
      </Drawer.Navigator>
    </>
  );
}

const CustomDrawer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <DrawerContentScrollView style={{ flex: 1, padding: 10 }}>
        <View>
          <Button
            color="#000"
            title="Logout"
            onPress={() => {
              dispatch(setuserDetails({}));
              dispatch(setIsLogout());
            }}
          />
        </View>
      </DrawerContentScrollView>
    </>
  );
};

export default DrawerNavigation;
