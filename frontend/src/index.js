import "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

export default function index() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "red",
    },
  };
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar style="light" />
        <App />
      </PaperProvider>
    </Provider>
  );
}
