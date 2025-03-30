import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View, Alert } from "react-native";
import { BlurView } from 'expo-blur'
import {useState, } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp} from 'firebase/app';

import { firebaseConfig } from '../../firebase-config';



export default function RegisterScreen() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log('Cuenta creada')
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      
      <Text style={styles.label}>USUARIO:</Text>
      <TextInput 
        onChangeText={(text)=> setEmail(text)}
        style={styles.input}
        placeholder="Ingresa tu nombre de usuario"
        placeholderTextColor={"#AE9D7F"}
      />

      <Text style={styles.label}>CONTRASEÑA:</Text>
      <TextInput
        onChangeText={(text)=> setPassword(text)}
        style={styles.input}
        placeholder="Ingresa contraseña"
        placeholderTextColor="#AE9D7F"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Crear ingresar</Text>
      </TouchableOpacity>

    </View>
  )
};


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
    fontSize: 17,
  },
  
});
