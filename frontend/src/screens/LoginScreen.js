import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LoginScreen() {
  let [userName, setUserName] = useState();
  let [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  let [password, setPassword] = useState();
  let [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  let [serverMessage, setServerMessage] = useState("");
  let [validUserName, setValidUserName] = useState(false);
  let [validPassword, setValidPassword] = useState(false);

  const isLogin = useSelector((state) => state.reducerIsLogin.isLogin);

  useEffect(() => {
    setUserName("");
    setPassword("");
  }, []);

  validateUsername = (username) => {
    if (username === "") {
      setUserNameErrorMessage("Username is required!");
    } else {
      const re = /^[A-Za-z][A-Za-z]{8,}$/;
      if (re.test(username)) {
        setValidUserName(true);
        setUserNameErrorMessage("");
      } else {
        setUserNameErrorMessage(
          "The username must have at least 8 characters (uppercase and lowercase letters only)."
        );
        setValidUserName(false);
      }
    }
  };
  validatePassword = (password) => {
    if (password === "") {
      setPasswordErrorMessage("Password is required!");
    } else {
      const re =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      if (re.test(password)) {
        setValidPassword(true);
        setPasswordErrorMessage("");
      } else
        setPasswordErrorMessage(
          "The Password must contain at least 6 characters (at least 1 uppercase or lowercase letter, 1 number and 1 special symbol)."
        );
      setValidPassword(false);
    }
  };

  login = async (username, password) => {
    const url = "";
    try {
      axios.post(
        url,
        JSON.stringify({ username: username, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      //setAuth({ userName, password, accessToken });
      setServerMessage("You Logged In Successfully");
      //setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setServerMessage("No Server Response");
        //setSuccess(false);
      } else if (err.response?.status === 400) {
        setServerMessage("Missing Email or Password");
        //setSuccess(false);
      } else if (err.response?.status === 401) {
        setServerMessage("Unauthorized");
        //setSuccess(false);
      } else {
        setServerMessage("Login Failed");
        //setSuccess(false);
      }
    }
  };
  return (
    <>
      <ImageBackground
        source={require("../../assets/login_background.jpg")}
        resizeMode="cover"
        style={styles.login_background_img}
      >
        <View style={styles.overlay_background} />

        <View style={styles.container}>
          <Text style={styles.logo}>Menora Flix</Text>
          <Text style={styles.login_title}> Login</Text>

          <View style={styles.username_input}>
            <TextInput
              onChangeText={(username) => {
                setUserName(username);
              }}
              style={styles.username_input_text}
              autoFocus={true}
              color="#fff"
              placeholderTextColor={"rgba(198, 198, 198, 1)"}
              placeholder="username"
            ></TextInput>
            <Text style={styles.userNameErrorMessage}>
              {userNameErrorMessage}
            </Text>
          </View>

          <View style={styles.password_input}>
            <TextInput
              onChangeText={(password) => {
                setPassword(password);
              }}
              style={styles.password_input_text}
              color="#fff"
              placeholderTextColor={"rgba(198, 198, 198, 1)"}
              placeholder="password"
              secureTextEntry={true}
            ></TextInput>
            <Text style={styles.passwordErrorMessage}>
              {passwordErrorMessage}
            </Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              validateUsername(userName);
              validatePassword(password);

              validUserName && validPassword && login(userName, password);
            }}
          >
            <View style={styles.login_button}>
              <Text style={styles.login_button_text}>Login</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.serverErrorMessage}>{serverMessage}</Text>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingTop: 100,
  },
  login_background_img: {
    width: "100%",
    height: "100%",
  },
  logo: {
    textAlign: "center",
    fontSize: 62,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 40,
    color: "#F40000",
  },
  overlay_background: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  login_title: {
    fontSize: 28,
    fontWeight: "400",
    padding: 10,
    color: "#fff",
    marginBottom: 15,
  },
  username_input_text: {
    fontSize: 17,
  },
  username_input: {
    backgroundColor: "#333333",
    paddingBottom: 6,
    paddingRight: 5,
    borderRadius: 5,
    marginBottom: 25,
  },

  password_input_text: {
    fontSize: 18,
  },

  password_input: {
    backgroundColor: "#333333",
    paddingBottom: 6,
    paddingRight: 5,
    borderRadius: 5,
    marginBottom: 60,
  },

  login_button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F40000",
  },
  login_button_text: {
    fontSize: 24,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
  },
  passwordErrorMessage: {
    fontSize: 15,
    color: "red",
  },
  userNameErrorMessage: {
    fontSize: 15,
    color: "red",
  },
  serverErrorMessage: {
    marginTop: 30,
    fontSize: 18,
    color: "#fff",
  },
});
