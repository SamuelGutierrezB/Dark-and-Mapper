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
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import * as Font from "expo-font";

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

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("../screens/map");
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
          source={require("../../../assets/images/DarkAndMapper.png")}
        />
      </View>

      <Text style={styles.title}>Inicia sesión</Text>

      {error && (
        <label style={styles.error}>Usuario o contraseña erroneos</label>
      )}
      <Text style={styles.label}>USUARIO:</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Ingresa tu nombre de usuario"
        placeholderTextColor={"#AE9D7F"}
      />

      <Text style={styles.label}>CONTRASEÑA:</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#AE9D7F"
        secureTextEntry
      />

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
