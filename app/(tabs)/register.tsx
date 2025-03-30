import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../../firebase-config";

export default function RegisterScreen() {
  const router = useRouter();

  const [fonstsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fonstsLoaded) {
      loadFonts();
    }
  });
  const loadFonts = async () => {
    Font.loadAsync({
      cormorantinfant: require("../../assets/fonts/CormorantInfant-Medium.ttf"),
    });

    setFontsLoaded(true);
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/explore");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          style={styles.image}
          source={require("../../assets/images/DarkAndMapper.png")}
        />
      </View>
      <Text style={styles.title}>Crear cuenta</Text>
      {error && (
        <label style={styles.error}>
          Correo o contraseña no validos para el registro
        </label>
      )}
      <Text style={styles.label}>Correo:</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Ingresa tu correo"
        placeholderTextColor={"#AE9D7F"}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Ingresa contraseña"
        placeholderTextColor="#AE9D7F"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Crear ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
