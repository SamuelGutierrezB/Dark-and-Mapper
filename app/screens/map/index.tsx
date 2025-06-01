import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { MarkerType } from "./mapTypes"; // Importa el tipo MarkerType
import { Animated } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import mapFilters from "../../../assets/data/filters.json"; // Importa el archivo JSON

export default function PrincipalMapScreen() {
  const mapOpacity = useState(new Animated.Value(1))[0];

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Estados para los filtros
  const [activeFilters, setActiveFilters] = useState({
    blue_Portal: false,
    red_Portal: false,
    bosses: false,
    sanctuary: false,
  });

  // Estado para el mapa actual
  const [currentMap, setCurrentMap] = useState("goblin_cave");

  // Imágenes de los mapas
  const images = {
    goblin_cave: require("../../../assets/images/GoblinCave.png"),
    crypts: require("../../../assets/images/Crypts.png"),
    ice_abyss: require("../../../assets/images/IceAbyss.png"),
    ice_caver: require("../../../assets/images/IceCaver.png"),
    infierno: require("../../../assets/images/Infierno.png"),
    ruins: require("../../../assets/images/Ruins.png"),
  };

  // Cargar fuentes
  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      cormorantinfant: require("../../../assets/fonts/CormorantInfant-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  // Cambiar mapa
  const changeMap = (mapKey: string) => {
    // Fade out
    Animated.timing(mapOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentMap(mapKey);
      setActiveFilters({
        blue_Portal: false,
        red_Portal: false,
        bosses: false,
        sanctuary: false,
      });

      // Fade in
      Animated.timing(mapOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // Obtener datos del mapa actual
  const getCurrentMapData = () => {
    return mapFilters.maps[currentMap] || {};
  };

  // Alternar filtro
  const toggleFilter = (filterType: MarkerType) => {
    const currentMapData = getCurrentMapData();
    if (
      !currentMapData[filterType] ||
      currentMapData[filterType]?.length === 0
    ) {
      ToastAndroid.show(
        `Este mapa no tiene ${filterType.replace("_", " ")}`,
        ToastAndroid.SHORT
      );
      return;
    }

    const updatedFilters = {
      ...activeFilters,
      [filterType]: !activeFilters[filterType],
    };

    setActiveFilters(updatedFilters);
    saveFiltersToStorage(updatedFilters, currentMap); // <- Guarda en AsyncStorage
  };
  const saveFiltersToStorage = async (
    filters: typeof activeFilters,
    mapKey: string
  ) => {
    try {
      await AsyncStorage.setItem(`filters_${mapKey}`, JSON.stringify(filters));
    } catch (error) {
      console.error("Error saving filters:", error);
    }
  };

  useEffect(() => {
    const loadFiltersFromStorage = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem(
          `filters_${currentMap}`
        );
        if (storedFilters) {
          setActiveFilters(JSON.parse(storedFilters));
        } else {
          setActiveFilters({
            blue_Portal: false,
            red_Portal: false,
            bosses: false,
            sanctuary: false,
          });
        }
      } catch (error) {
        console.error("Error loading filters:", error);
      }
    };

    loadFiltersFromStorage();
  }, [currentMap]);

  // Renderizar marcadores
  const renderMarkers = () => {
    const currentData = getCurrentMapData();
    return (Object.keys(currentData) as MarkerType[]).flatMap((type) => {
      return currentData[type].map((coord, index) => (
        <Marker
          key={`${type}-${index}`}
          type={type}
          coord={coord}
          visible={activeFilters[type]}
        />
      ));
    });
  };

  // Mapeo de botones a keys de mapa
  const mapButtons = [
    {
      key: "goblin_cave",
      image: require("../../../assets/images/ButtonGoblin.png"),
    },
    {
      key: "crypts",
      image: require("../../../assets/images/ButtonCrypts.png"),
    },
    {
      key: "ice_abyss",
      image: require("../../../assets/images/ButtonIceAbyss.png"),
    },
    {
      key: "ice_caver",
      image: require("../../../assets/images/ButtonIceCaver.png"),
    },
    {
      key: "infierno",
      image: require("../../../assets/images/ButtonInfierno.png"),
    },
    { key: "ruins", image: require("../../../assets/images/ButtonRuins.png") },
  ];

  return (
    <View style={styles.container}>
      <Toast
        config={{
          success: (props) => (
            <View
              style={{
                backgroundColor: "#2A2A2A",
                borderRadius: 15,
                padding: 15,
                marginBottom: 40,
                borderWidth: 1,
                borderColor: "#AE9D7F",
              }}
            >
              <Text style={{ color: "#AE9D7F", fontSize: 16 }}>
                {props.text1}
              </Text>
            </View>
          ),
          error: (props) => (
            <View
              style={{
                backgroundColor: "#2A2A2A",
                borderRadius: 15,
                padding: 15,
                marginBottom: 40,
                borderWidth: 1,
                borderColor: "red",
              }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>{props.text1}</Text>
            </View>
          ),
          info: (props) => (
            <View
              style={{
                backgroundColor: "#2A2A2A",
                borderRadius: 15,
                padding: 15,
                marginBottom: 40,
                borderWidth: 1,
                borderColor: "#4A90E2",
              }}
            >
              <Text style={{ color: "#4A90E2", fontSize: 16 }}>
                {props.text1}
              </Text>
              {props.text2 && (
                <Text style={{ color: "#AE9D7F", fontSize: 14 }}>
                  {props.text2}
                </Text>
              )}
            </View>
          ),
        }}
      />
      <View className="maps-contanier" style={styles.mapcontainer}>
        <View className="maps-buttons" style={styles.mapsbuttons}>
          {mapButtons.map((button) => (
            <TouchableOpacity
              key={button.key}
              onPress={() => changeMap(button.key)}
            >
              <Image source={button.image} style={{ width: 60, height: 50 }} />
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          className="map"
          style={styles.map}
          showsVerticalScrollIndicator={false}
          maximumZoomScale={3}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView horizontal>
            <View>
              <Animated.Image
                style={[styles.goblin, { opacity: mapOpacity }]}
                source={images[currentMap as keyof typeof images]}
              />
              {renderMarkers()}
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      <View className="filters-markers" style={styles.filters}>
        <TouchableOpacity
          style={styles.buttonfilters}
          onPress={() => toggleFilter("red_Portal")}
        >
          <Image
            source={require("../../../assets/images/RedPortal.png")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonfilters}
          onPress={() => toggleFilter("blue_Portal")}
        >
          <Image
            source={require("../../../assets/images/BluePortal.png")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonfilters}
          onPress={() => toggleFilter("bosses")}
        >
          <Image
            source={require("../../../assets/images/BossesIcon.png")}
            style={{ width: 49, height: 49, marginTop: 4 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonfilters}
          onPress={() => toggleFilter("sanctuary")}
        >
          <Image
            source={require("../../../assets/images/SantuaryIcon.png")}
            style={{ width: 42, height: 42 }}
          />
        </TouchableOpacity>
      </View>
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

const Marker = ({
  type,
  coord,
  visible,
}: {
  type: MarkerType;
  coord: number[];
  visible: boolean;
}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible && opacity.__getValue() === 0) return null; // no lo montes si está oculto y su animación ya terminó

  let imageSource;
  switch (type) {
    case "blue_Portal":
      imageSource = require("../../../assets/images/BluePortal.png");
      break;
    case "red_Portal":
      imageSource = require("../../../assets/images/RedPortal.png");
      break;
    case "bosses":
      imageSource = require("../../../assets/images/BossesIcon.png");
      break;
    case "sanctuary":
      imageSource = require("../../../assets/images/SantuaryIcon.png");
      break;
  }

  return (
    <Animated.Image
      source={imageSource}
      style={{
        position: "absolute",
        left: coord[0],
        top: coord[1],
        width: 50,
        height: 50,
        opacity,
      }}
    />
  );
};
