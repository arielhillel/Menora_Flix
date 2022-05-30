import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (name, val) => {
  try {
    await AsyncStorage.setItem(name, val);
  } catch (error) {
    console.log(error);
  }
};

export const rertrieveData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    console.log(value);
    if (value !== null) {
      return value;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
};
