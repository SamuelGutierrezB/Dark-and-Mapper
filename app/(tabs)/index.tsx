import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View,} from "react-native";
import { BlurView } from 'expo-blur'
import {useState, useEffect} from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp} from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import * as Font from 'expo-font'


export default function LoginScreen() {

  

//inicio de agregación de fuente cormorantinfant
  const [fonstsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fonstsLoaded){
      loadFonts();
    }
  });

  const loadFonts = async () => {

    Font.loadAsync({
      'cormorantinfant': require('../../assets/fonts/CormorantInfant-Medium.ttf')
    });

    setFontsLoaded(true);
  }
//Termino de sección de agregación de fuente cormorantinfant

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const handleSighIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => { 
      console.log('Sesion iniciada')
      const user = userCredenctial.user; //se ocupa el crear cuenta
      console.log(user)
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      source={require('../../assets/images/DarkAndMapper.png')}
      />

      <Text style={styles.title}>Inicia sesión</Text>
      
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
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#AE9D7F"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSighIn} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>¿No tienes cuenta? Crea una aquí </Text>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical:30,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 38,
    color: "#AE9D7F",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: 'cormorantinfant',
  },
  label: {
    fontSize: 20,
    color: "#AE9D7F",
    marginBottom: 20,
    fontFamily: 'cormorantinfant',
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
    fontFamily: 'cormorantinfant',

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
    fontFamily: 'cormorantinfant',

  },
  footerText: {
    marginBottom: 0,
    marginTop:50,
    textAlign: "center",
    color: "#A1CEDC",
    fontSize: 17,
    fontFamily: 'cormorantinfant',

  },
  image:{
    marginBottom:10,
    marginLeft:80,
    marginRight:80,
    width: 170, 
    height: 170, 
  
  }
  
});
