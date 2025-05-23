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

import { firebaseConfig } from "../../../firebase-config";

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
      cormorantinfant: require("../../../assets/fonts/CormorantInfant-Medium.ttf"),
    });

    setFontsLoaded(true);
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const images = {
    img1: require("../../../assets/images/GoblinCave.png"),
    img2: require("../../../assets/images/Crypts.png"),
    img3: require("../../../assets/images/IceAbyss.png"),
    img4: require("../../../assets/images/IceCaver.png"),
    img5: require("../../../assets/images/Infierno.png"),
    img6: require("../../../assets/images/Ruins.png"),
  };



  //Parte de los filtros 
  const [imageSource, setImageSource] = useState(images.img1); // Establece img1 como imagen inicial

//--------------------------------------------------------------------->




  //RECORDATORIO DE CREAR UNA FUNCIÓN QUE CONTROLE TODOS LOS FILTROS PARA PODER ASIGNARLES FALSE Y SE BORREN AL SELECCIONAR OTRO MAPA
  return (
    <View style={styles.container}>
      <View className="maps-contanier" style={styles.mapcontainer}>
        <View className="maps-buttons" style={styles.mapsbuttons}>

          <TouchableOpacity //boton que cambia la imagen del mapa a goblins
            onPress={() => setImageSource(images.img1)}
          >
            <Image
              source={require("../../../assets/images/ButtonGoblin.png")}
              style={{ width: 60, height: 50 }}
            />
          </TouchableOpacity>


          <TouchableOpacity //boton que cambia la imagen del mapa a crypts
            onPress={() => setImageSource(images.img2)}
          >
            <Image
              source={require("../../../assets/images/ButtonCrypts.png")}
              style={{ width: 60, height: 50 }}
            />
          </TouchableOpacity>

    

          <TouchableOpacity //boton que cambia la imagen del mapa a ice abyss
            onPress={() => setImageSource(images.img3)}
          >
            <Image
              source={require("../../../assets/images/ButtonIceAbyss.png")}
              style={{ width: 60, height: 50 }}
            />
          </TouchableOpacity>




          <TouchableOpacity //boton que cambia la imagen del mapa a ice caver
            onPress={() => setImageSource(images.img4)}
          >
            <Image
              source={require("../../../assets/images/ButtonIceCaver.png")}
              style={{ width: 60, height: 50 }}
            />
          </TouchableOpacity>



          <TouchableOpacity //boton que cambia la imagen del mapa a infierno
            onPress={() => setImageSource(images.img5)}
          >
            <Image
              source={require("../../../assets/images/ButtonInfierno.png")}
              style={{ width: 60, height: 50 }}
            />
          </TouchableOpacity>



          <TouchableOpacity //boton que cambia la imagen del mapa a ruins
            onPress={() => setImageSource(images.img6)}
          >
            <Image
              source={require("../../../assets/images/ButtonRuins.png")}
              style={{ width: 60, height: 50 }}
            />
          </TouchableOpacity>

        </View>

        <ScrollView //ScrollView para el mapa vertical
          className="map"
          style={styles.map}
          showsVerticalScrollIndicator={false}
          maximumZoomScale={3}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView horizontal //ScrollView horizontal para el mapa 
          
          >
            <View
            //--------------------------------------------------------------------->
            //RECORDATORIO PARA EL MAPA DE GOBLINS QUE NO TIENE REDPORTALS, PARA PONER SOLO UN TOAST
            >
              <Image style={styles.goblin} source={imageSource} />


              
            </View>
          </ScrollView>
        </ScrollView>
      </View>





      <View className="filters-markers" style={styles.filters} // parte de los filtros
      
      >
        <TouchableOpacity style={styles.buttonfilters} //boton de los filtros de red portal
        >
          <Image
            source={require("../../../assets/images/RedPortal.png")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>


        <TouchableOpacity //boton de los filtros de blue portal
          style={styles.buttonfilters}
        >
          <Image
            source={require("../../../assets/images/BluePortal.png")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>


        <TouchableOpacity //boton de los filtros de bosses
          style={styles.buttonfilters}
        >
          <Image
            source={require("../../../assets/images/BossesIcon.png")}
            style={{ width: 47, height: 47 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonfilters}//boton de los filtros de santuary
        >
          <Image
            source={require("../../../assets/images/SantuaryIcon.png")}
            style={{ width: 42, height: 42 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
      >
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
  mapcontainer: {
    flexDirection: "row", //coloca todo lo de adentro en orden de izquierda a derecha
    flex: 10,
    backgroundColor: "#121212",
  },
  mapsbuttons: {
    flexDirection: "column",
    backgroundColor: "#121212",
    margin: 5,
    width: 60,
    height: 330,
    justifyContent: "space-around",
  },
  map: {
    backgroundColor: "#121212",
    margin: 5,
    borderRadius: 30,
  },
  filters: {
    backgroundColor: "#121212",
    marginTop: 20,
    flex: 1,
    marginRight: 50,
    marginLeft: 110,
    minWidth: 159,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 50,
    marginLeft: 110,
    marginTop: 15,
    marginBottom: 15,
    minWidth: 90,
    justifyContent: "center",
  },
  textbutton: {
    color: "#AE9D7F",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "cormorantinfant",
    textAlign: "center",
    flexShrink: 1,
  },
  goblin: {
    borderRadius: 30,
    height: 650,
  },
  buttonfilters: {
    width: 60,
    height: 60,
    backgroundColor: "#2A2A2A",
    borderRadius: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
