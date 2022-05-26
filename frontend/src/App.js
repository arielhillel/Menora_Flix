import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./redux/redux";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <LoginScreen />
      </SafeAreaView>
    </Provider>
  );
}
