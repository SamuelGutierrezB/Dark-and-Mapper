import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
    Alert,
    ScrollView,
    Dimensions,
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
  
    const images = {
      img1: require("../../assets/images/GoblinCave.png"),
      img2: require("../../assets/images/Crypts.png"),
      img3: require("../../assets/images/IceAbyss.png"),
      img4: require("../../assets/images/IceCaver.png"),
      img5: require("../../assets/images/Infierno.png"),
      img6: require("../../assets/images/Ruins.png"),

    };
  
    const [imageSource, setImageSource] = useState(images.img1); // Establece img1 como imagen inicial
    const [isBluePortalVisible, setIsBluePortalVisible] = useState(true); // Función para desactivar y activar el BluePortal
    const [isBossesVisible, setIsBossesVisible]= useState(false);
   
    //RECORDATORIO DE CREAR UNA FUNCIÓN QUE CONTROLE TODOS LOS FILTROS PARA PODER ASIGNARLES FALSE Y SE BORREN AL SELECCIONAR OTRO MAPA
    return (
        <View style={styles.container}>
          
        <View className="maps-contanier"
        style={styles.mapcontainer}>

        <View className="maps-buttons"
        style={styles.mapsbuttons}>

            <TouchableOpacity
            onPress={()=> setImageSource(images.img1)}
            onPressIn={()=> setIsBluePortalVisible(false)} //función para borrar el filtro al presionar, se tiene que cambiar proximamente a una función que tenga en conjunto todas las funciones
            
            > 
            <Image
            source={require("../../assets/images/ButtonGoblin.png")}
            style={{ width: 60, height: 50,}}
            />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setImageSource(images.img2)}
            onPressIn={()=> setIsBluePortalVisible(false)}
            > 
            
            <Image
            source={require("../../assets/images/ButtonCrypts.png")}
            style={{ width: 60, height: 50,}}
            />
            
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setImageSource(images.img3)}
            onPressIn={()=> setIsBluePortalVisible(false)}
            > 

            <Image
            source={require("../../assets/images/ButtonIceAbyss.png")}
            style={{ width: 60, height: 50,}}
            />
            
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setImageSource(images.img4)}
            onPressIn={()=> setIsBluePortalVisible(false)}
            > 

            <Image
            source={require("../../assets/images/ButtonIceCaver.png")}
            style={{ width: 60, height: 50,}}
            />

            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setImageSource(images.img5)}
            onPressIn={()=> setIsBluePortalVisible(false)}
            > 

            <Image
            source={require("../../assets/images/ButtonInfierno.png")}
            style={{ width: 60, height: 50,}}
            />

            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setImageSource(images.img6)}
            onPressIn={()=> setIsBluePortalVisible(false)}
            > 

            <Image
            source={require("../../assets/images/ButtonRuins.png")}
            style={{ width: 60, height: 50,}}
            />

            </TouchableOpacity>
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
              <View
              //RECORDATORIO PARA EL MAPA DE GOBLINS QUE NO TIENE REDPORTALS, PARA PONER SOLO UN TOAST 
              >
                  <Image style={styles.goblin} source={imageSource} /> 
                
                  {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 190, // Coordenada Y
                    left: 20, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                
                  
                  {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 250, // Coordenada Y
                    left: 145, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                     {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 300, // Coordenada Y
                    left: 267, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                     {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 490, // Coordenada Y
                    left: 200, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                     {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 15, // Coordenada Y
                    left: 190, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                     {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 90, // Coordenada Y
                    left: 385, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                    {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 200, // Coordenada Y
                    left: 390, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                    {isBluePortalVisible && (<Image source={require("../../assets/images/BluePortal.png")} 
                  style={{ 
                    position: "absolute",
                    top: 245, // Coordenada Y
                    left: 550, // Coordenada X
                    width: 50, 
                    height: 50,}} />)}
                    
                    {isBossesVisible && (<Image source={require("../../assets/images/BossesIcon.png")}
                    style={{ 
                      position: "absolute",
                      top: 420, // Coordenada Y
                      left: 390, // Coordenada X
                      width: 50, 
                      height: 50,}}/>)}
                           {isBossesVisible && (<Image source={require("../../assets/images/BossesIcon.png")}
                    style={{ 
                      position: "absolute",
                      top: 175, // Coordenada Y
                      left: 140, // Coordenada X
                      width: 50, 
                      height: 50,}}/>)}
              </View>
              </ScrollView>
                  
            </ScrollView>

        
        </View> 
        


        <View className="filters-markers"
        style={styles.filters}>

          <TouchableOpacity
            style={styles.buttonfilters}> 

            <Image
            source={require("../../assets/images/RedPortal.png")}
            style={{ width: 45, height: 45,}}
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonfilters}
            onPress={() => setIsBluePortalVisible(!isBluePortalVisible)}> 

            <Image
            source={require("../../assets/images/BluePortal.png")}
            style={{ width: 45, height: 45,}}
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonfilters}
            onPress={() => setIsBossesVisible(!isBossesVisible)}
            
            > 

            <Image
            source={require("../../assets/images/BossesIcon.png")}
            style={{ width: 47, height: 47,}}
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonfilters}> 

            <Image
            source={require("../../assets/images/SantuaryIcon.png")}
            style={{ width: 42, height: 42,}}
            />

          </TouchableOpacity>

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
      backgroundColor: "#121212",
      
    },
    mapsbuttons:{
      flexDirection:"column",
      backgroundColor: "#121212",
      margin:5,
      width:60,
      height:330,
      justifyContent:"space-around"
    },
    map:{
      backgroundColor: "#121212",
      margin: 5,
      borderRadius:30,
      
    },
    filters:{
      backgroundColor: "#121212",
      marginTop:20,
      flex:1,
      marginRight:50,
      marginLeft:110,
      minWidth:159,
      flexDirection: "row",
      justifyContent:"space-around",
      alignItems:"center",

    },
    button:{
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginRight:50,
    marginLeft:110,
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
      height:650,
    },
    buttonfilters:{
       width: 60,
       height: 60,
       backgroundColor:"#2A2A2A",
       borderRadius:30,
       justifyContent:"space-around",
       alignItems:"center"
      
    },
    


  });
  