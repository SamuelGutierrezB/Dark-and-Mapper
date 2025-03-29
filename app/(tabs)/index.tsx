import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión</Text>
      
      <Text style={styles.label}>USUARIO:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre de usuario"
        placeholderTextColor={"#AE9D7F"}
      />

      <Text style={styles.label}>CONTRASEÑA:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#AE9D7F"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>¿No tienes cuenta? Crea una aquí </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 38,
    color: "#AE9D7F",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    color: "#AE9D7F",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#FFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,
    fontSize:17,
  },
  button: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginLeft:100,
    marginRight:100,
    marginTop:15,
  },
  buttonText: {
    color: "#AE9D7F",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginBottom: 0,
    marginTop:50,
    textAlign: "center",
    color: "#A1CEDC",
    fontWeight: "bold",
  },
  
});
