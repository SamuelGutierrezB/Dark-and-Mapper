import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
    Alert,
    ScrollView,
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
          
        <View className="maps-contanier"
        style={styles.mapcontainer}>

        <View className="maps-buttons"
        style={styles.mapsbuttons}>
        </View>


            <ScrollView
            className="map"
            style={styles.map}
            
            showsVerticalScrollIndicator={false}
            maximumZoomScale={3}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            >
              <ScrollView
              horizontal>
              <Image
                  style={styles.goblin}
                  resizeMode="contain"
                    source={require("../../assets/images/GoblinCave.png")}
                  />

              </ScrollView>
                  
            </ScrollView>

        
        </View> 
        


        <View className="filters-markers"
        style={styles.filters}>
        </View>



         <TouchableOpacity 
         onPress={() => router.push("/register")}
         style={styles.button}>
         <Text style={styles.textbutton}>Ruta recomendada</Text>
         </TouchableOpacity>


        </View> 
      );
    }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "#121212",
      
    },
    mapcontainer:{
      flexDirection:"row", //coloca todo lo de adentro en orden de izquierda a derecha
      flex:10,
      backgroundColor: "white",
      
    },
    mapsbuttons:{
      flexDirection:"column",
      backgroundColor: "red",
      margin:5,
      width:80,
      height:330,
    },
    map:{
      backgroundColor:"blue",
      margin: 5,
      borderRadius:30,
      
    },
    filters:{
      backgroundColor: "yellow",
      marginTop:20,
      flex:1,
      marginRight:70,
      marginLeft:70,
      minWidth:159,
    },
    button:{
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 100,
    marginRight: 100,
    marginTop: 15,
    marginBottom:15,
    minWidth: 90,
    justifyContent: "center"
      
    },
    textbutton:{
    color: "#AE9D7F",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "cormorantinfant",
    textAlign: "center",
    flexShrink: 1,
    },
    goblin:{
      
      borderRadius:30,
    
    }


  });
  