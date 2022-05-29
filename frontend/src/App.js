import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";
import { useSelector } from "react-redux";

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
