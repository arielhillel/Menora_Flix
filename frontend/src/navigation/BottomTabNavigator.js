import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { resetCounter } from "../redux/countNewFavoritesSlice";
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  let countNewFavorites = useSelector(
    (state) => state.reducercountNewFavorites.countNewFavorites
  );
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        listeners={{
          tabPress: () => {
            dispatch(resetCounter());
            console.log(countNewFavorites);
          },
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="star" size={25} color={color} />
          ),
          tabBarBadge: countNewFavorites < 1 ? null : countNewFavorites,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
