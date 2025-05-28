import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { firebaseConfig } from "../../../firebase-config";
import { initializeApp } from "firebase/app";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LoginScreen() {
  const router = useRouter();

  const [fonstsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fonstsLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    Font.loadAsync({
      cormorantinfant: require("../../../assets/fonts/CormorantInfant-Medium.ttf"),
    });

    setFontsLoaded(true);
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError(true);
      return;
    }
    setError(false);
    try {
      console.log("Iniciando sesión");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Guarda datos en AsyncStorage
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
        })
      );

      router.push("../screens/map");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/DarkAndMapper.png")}
        />
      </View>

      <Text style={styles.title}>Inicia sesión</Text>

      {error && <Text style={styles.error}>Correo o contraseña erroneos</Text>}
      <Text style={styles.label}>Correo:</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Ingresa tu correo"
        placeholderTextColor={"#AE9D7F"}
      />

      <Text style={styles.label}>CONTRASEÑA:</Text>
      <View style={styles.passContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#AE9D7F"
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.icon}
        >
          <Icon
            name={isSecure ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#AE9D7F"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text
        style={styles.footerText}
        onPress={() => router.push("/screens/authentication/register")}
      >
        ¿No tienes cuenta? Crea una aquí{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  passContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    paddingRight: 40, // espacio para el ícono
    borderWidth: 1,
    borderColor: "#AE9D7F",
    borderRadius: 8,
    padding: 10,
    color: "#000",
  },
  icon: {
    marginTop: "-17px",
    marginRight: "10px",
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 38,
    color: "#AE9D7F",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "cormorantinfant",
  },
  label: {
    fontSize: 20,
    color: "#AE9D7F",
    marginBottom: 20,
    fontFamily: "cormorantinfant",
  },
  error: {
    fontSize: 20,
    color: "#F58382",
    marginBottom: 20,
    fontFamily: "cormorantinfant",
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#FFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 17,
    fontFamily: "cormorantinfant",
  },
  button: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 100,
    marginRight: 100,
    marginTop: 15,
  },
  buttonText: {
    color: "#AE9D7F",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "cormorantinfant",
  },
  footerText: {
    marginBottom: 0,
    marginTop: 50,
    textAlign: "center",
    color: "#A1CEDC",
    fontSize: 17,
    fontFamily: "cormorantinfant",
  },
  image: {
    width: 170,
    height: 170,
  },
});
