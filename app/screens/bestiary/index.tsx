// components/BestiaryList.tsx
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Definimos el tipo para nuestros monstruos basado en la estructura JSON
type Monster = {
  id: string;
  name: string;
  stats: {
    health: {
      normal: number;
      elite: number;
      nightmare: number;
    };
    run_state: number;
    move_speed: string;
    defenses: {
      physical: string;
      magic: string;
      projectile: string;
    };
  };
  attacks: {
    name: string;
    damage: string;
    type: string;
    description: string;
    dodge_notes: {
      normal?: string;
      elite?: string;
      nightmare?: string;
    };
  }[];
  strategies: {
    normal: string;
    elite: string;
    nightmare: string;
  };
  image: string;
  difficulty_scaling?: {
    damage_multiplier: {
      elite: number;
      nightmare: number;
    };
    speed_multiplier: {
      elite: number;
      nightmare: number;
    };
  };
};

type BestiaryData = {
  monsters: Monster[];
};

export default function BestiaryList() {
  const navigation = useNavigation();
  // Cargamos los datos del bestiario (en un proyecto real, esto podría venir de una API)
  const bestiaryData: BestiaryData = require("../../../assets/data/bestary.json");

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  const loadFonts = async () => {
    await Font.loadAsync({
      cormorantinfant: require("../../../assets/fonts/CormorantInfant-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bestiaryData.monsters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MonsterDetails", { monster: item })
            }
            style={styles.monsterItem}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.statsContainer}>
                <Text style={styles.statText}>
                  HP: {item.stats.health.normal}
                </Text>
                <Text style={styles.statText}>
                  Def: {item.stats.defenses.physical}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: "#121212",
    borderColor: "#7F7A74",
    padding: 20,
    borderRadius: 25,
    height: "99%",
  },
  listContent: {
    gap: 10,
    paddingBottom: 20,
  },
  monsterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#1E1E1E",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 25,
    fontWeight: "500",
    color: "#AE9D7F",
    fontFamily: "cormorantinfant",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  statText: {
    fontSize: 14,
    color: "#7F7A74",
    fontFamily: "cormorantinfant",
  },
});
