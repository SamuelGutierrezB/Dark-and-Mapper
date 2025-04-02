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
  
  export default function PrincipalMapScreen() {
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
  
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  
  
    return (
        <View style={styles.container}>
          
        <View
        style={styles.mapcontainer}
        className="maps-contanier">

        <View className="maps-buttons">
        

        </View>

        <View className="map">


        </View>

        </View>
        
        <View className="filters-markers">

        </View>
        <button className="route-recommended"></button>
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
    mapcontainer:{
      
    }
  });
  