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
import * as Font from "expo-font";
import { MarkerType } from "./mapTypes"; // Importa el tipo MarkerType
import mapFilters from "../../../assets/data/filters.json"; // Importa el archivo JSON
import { useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function PrincipalMapScreen() {
  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const route = useRoute();
  const { fromMission, recommendedFilters, recommendedMap } =
    route.params || {};

  // Estados para los filtros
  const [activeFilters, setActiveFilters] = useState({
    blue_Portal: false,
    red_Portal: false,
    bosses: false,
    sanctuary: false,
    mission: false, // Añadido el estado para el filtro de misión
  });

  // Estado para las coordenadas de misión
  const [missionCoords, setMissionCoords] = useState<[number, number][]>([]);

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

  useEffect(() => {
    if (fromMission && recommendedMap) {
      setCurrentMap(recommendedMap);
    }

    if (fromMission && recommendedFilters) {
      // Convertir recommendedFilters a un array de coordenadas
      const coords = recommendedFilters.map(
        (filter: number[]) => [filter[0], filter[1]] as [number, number]
      );
      setMissionCoords(coords);

      // Activar el filtro de misión
      setActiveFilters((prev) => ({
        ...prev,
        mission: true,
      }));
    }
  }, [fromMission, recommendedMap, recommendedFilters]);

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

  // Obtener datos del mapa actual
  const getCurrentMapData = () => {
    return mapFilters.maps[currentMap] || {};
  };

  // Alternar filtro
  const toggleFilter = (filterType: MarkerType) => {
    if (filterType === "mission") {
      // Para el filtro de misión, usamos las coordenadas de missionCoords
      setActiveFilters((prev) => ({
        ...prev,
        [filterType]: !prev[filterType],
      }));
      return;
    }

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
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // Renderizar marcadores
  const renderMarkers = () => {
    const markers = [];
    const currentData = getCurrentMapData();

    (Object.keys(activeFilters) as MarkerType[]).forEach((type) => {
      if (activeFilters[type]) {
        let coordsToRender: [number, number][] = [];

        if (type === "mission") {
          coordsToRender = missionCoords;
        } else {
          coordsToRender = currentData[type] || [];
        }

        if (coordsToRender.length > 0) {
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
            case "mission":
              imageSource = require("../../../assets/images/flagMission.png");
              break;
          }

          coordsToRender.forEach((coord, index) => {
            markers.push(
              <Image
                key={`${type}-${index}`}
                source={imageSource}
                style={{
                  position: "absolute",
                  top: coord[0],
                  left: coord[1],
                  width: 50,
                  height: 50,
                }}
              />
            );
          });
        }
      }
    });

    return markers;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: -10,
          display: "flex",
          flexDirection: "row-reverse",
        }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" size={24} color="#AE9D7F" />
      </TouchableOpacity>
      <View className="maps-contanier" style={styles.mapcontainer}>
        <View className="maps-buttons" style={styles.mapsbuttons}></View>

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
              <Image
                style={styles.goblin}
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

        {/* Botón para el filtro de misión */}
        <TouchableOpacity
          style={styles.buttonfilters}
          onPress={() => toggleFilter("mission")}
        >
          <Image
            source={require("../../../assets/images/flagMission.png")}
            style={{ width: 45, height: 45 }}
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
