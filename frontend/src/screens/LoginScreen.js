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
import { useDispatch } from "react-redux";
import { setuserDetails } from "../redux/userDetailsSlice";
import { setIsLogin } from "../redux/isLoginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [userName, setUserName] = useState();
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [password, setPassword] = useState();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState("false");

  const getisSignedUp = async () => {
    try {
      const value = await AsyncStorage.getItem("isSignUp");
      if (value !== null) {
        setIsSignedUp(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (e) {
  //     // clear error
  //   }

  //   console.log("Done.");
  // };

  const dispatch = useDispatch();

  validateUsername = (usernameToValidate) => {
    if (usernameToValidate === "") {
      setUserNameErrorMessage("Username is required!");
      setValidUserName(false);
    } else {
      const re = /^(?=.*[A-Za-z])[A-Za-z]{8,}$/;
      if (re.test(usernameToValidate)) {
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
  validatePassword = (passwordToValidate) => {
    if (passwordToValidate === "") {
      setPasswordErrorMessage("Password is required!");
      setValidPassword(false);
    } else {
      const re =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      if (re.test(passwordToValidate)) {
        setValidPassword(true);
        setPasswordErrorMessage("");
      } else {
        setPasswordErrorMessage(
          "The Password must contain at least 6 characters (at least 1 uppercase or lowercase letter, 1 number and 1 special symbol)."
        );
        setValidPassword(false);
      }
    }
  };

  login = async (usernameToLogin, passwordToLogin) => {
    const url = `https://menora-flix.herokuapp.com/login`;
    try {
      let response = await axios.post(
        url,
        JSON.stringify({
          username: usernameToLogin,
          password: passwordToLogin,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      dispatch(setuserDetails({ userName, password, accessToken }));
      setServerMessage("You Logged In Successfully");
      dispatch(setIsLogin());
    } catch (err) {
      if (!err?.response) {
        setServerMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setServerMessage("Re-enter username and password");
      } else if (err.response?.status === 401) {
        setServerMessage("Unauthorized");
      } else {
        setServerMessage("Login Failed");
      }
    }
  };

  Signup = async (usernameToSignup, passwordToSignup) => {
    const url = `https://menora-flix.herokuapp.com/signup`;
    try {
      let response = await axios.post(
        url,
        JSON.stringify({
          username: usernameToSignup,
          password: passwordToSignup,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setServerMessage("You Signed Up Successfully");
      try {
        await AsyncStorage.setItem("isSignUp", "true");
        await setIsSignedUp("true");
      } catch (e) {
        console.log(e);
      }
    } catch (err) {
      if (!err?.response) {
        setServerMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setServerMessage("Re-enter username and password");
      } else if (err.response?.status === 409) {
        setServerMessage("Existing Username");
      } else {
        setServerMessage("Signup Failed");
      }
    }
  };

  useEffect(() => {
    setUserName("");
    setPassword("");
    getisSignedUp();
  }, [isSignedUp]);

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
          <Text style={styles.login_title}>
            {isSignedUp === "true" ? "Login" : "Sign up"}
          </Text>

          <View style={styles.username_input}>
            <TextInput
              onChangeText={(usernameFromInput) => {
                setUserName(usernameFromInput);
                validateUsername(usernameFromInput);
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
              onChangeText={(passwordFromInput) => {
                setPassword(passwordFromInput);
                validatePassword(passwordFromInput);
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
            onPress={() => {
              setServerMessage("");
              validPassword && validUserName
                ? isSignedUp === "true"
                  ? login(userName, password)
                  : Signup(userName, password)
                : setServerMessage("Enter Username and password!");
            }}
          >
            <View style={styles.login_button}>
              <Text style={styles.login_button_text}>
                {isSignedUp === "true" ? "Login" : "Sign Up"}
              </Text>
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
