import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DrawerNavigation from "./navigation/DrawerNavigation";

export default function App() {
  const isLogin = useSelector((state) => state.reducerIsLogin.isLogin);
  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
    </>
  );
}
