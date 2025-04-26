// components/MonsterDetails.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function MonsterDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { monster } = route.params;

  console.log("Monster Details:", monster);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" size={24} color="#AE9D7F" />
      </TouchableOpacity>

      {/* Encabezado con imagen y nombre */}
      <View style={styles.monsterHeader}>
        <Image source={{ uri: monster.image }} style={styles.image} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{monster.name}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>
              Vida: {monster.stats.health.normal}/{monster.stats.health.elite}/
              {monster.stats.health.nightmare}
            </Text>
            <Text style={styles.stat}>
              Velocidad: {monster.stats.run_state}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.contentScroll}>
        {/* Defensas */}
        <Text style={styles.sectionTitle}>Defensas</Text>
        <View style={styles.divider} />
        <View style={styles.defensesContainer}>
          <Text style={styles.defense}>
            Física: {monster.stats.defenses.physical}
          </Text>
          <Text style={styles.defense}>
            Mágica: {monster.stats.defenses.magic}
          </Text>
          <Text style={styles.defense}>
            Proyectiles: {monster.stats.defenses.projectile}
          </Text>
        </View>

        {/* Ataques */}
        <Text style={styles.sectionTitle}>Ataques</Text>
        <View style={styles.divider} />
        {monster.attacks.map((attack, index) => (
          <View key={index} style={styles.attackContainer}>
            <Text style={styles.attackName}>
              {attack.name} - {attack.damage} ({attack.type})
            </Text>
            <Text style={styles.attackDescription}>{attack.description}</Text>
            {attack.dodge_notes.normal && (
              <Text style={styles.dodgeNote}>
                Normal: {attack.dodge_notes.normal}
              </Text>
            )}
            {attack.dodge_notes.elite && (
              <Text style={styles.dodgeNote}>
                Élite: {attack.dodge_notes.elite}
              </Text>
            )}
            {attack.dodge_notes.nightmare && (
              <Text style={styles.dodgeNote}>
                Pesadilla: {attack.dodge_notes.nightmare}
              </Text>
            )}
          </View>
        ))}

        {/* Estrategias */}
        <Text style={styles.sectionTitle}>Estrategias</Text>
        <View style={styles.divider} />
        <View style={styles.strategyContainer}>
          <Text style={styles.strategyTitle}>Normal:</Text>
          <Text style={styles.strategyText}>{monster.strategies.normal}</Text>

          <Text style={styles.strategyTitle}>Élite:</Text>
          <Text style={styles.strategyText}>{monster.strategies.elite}</Text>

          <Text style={styles.strategyTitle}>Pesadilla:</Text>
          <Text style={styles.strategyText}>
            {monster.strategies.nightmare}
          </Text>
        </View>
      </ScrollView>
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
  backButton: {
    marginTop: -10,
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: 10,
  },
  monsterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#1E1E1E",
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 25,
    fontWeight: "500",
    color: "#AE9D7F",
    fontFamily: "cormorantinfant",
    marginBottom: 5,
  },
  statsRow: {
    gap: 10,
  },
  stat: {
    fontSize: 14,
    color: "#7F7A74",
    fontFamily: "cormorantinfant",
  },
  contentScroll: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    color: "#AE9D7F",
    fontWeight: "bold",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#7F7A74",
    width: "100%",
    marginBottom: 15,
  },
  defensesContainer: {
    marginBottom: 20,
    gap: 8,
  },
  defense: {
    fontSize: 16,
    color: "#ccc",
  },
  attackContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  attackName: {
    fontSize: 18,
    color: "#AE9D7F",
    fontWeight: "600",
    marginBottom: 5,
  },
  attackDescription: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 8,
  },
  dodgeNote: {
    fontSize: 14,
    color: "#7F7A74",
    fontStyle: "italic",
    marginLeft: 10,
    marginBottom: 3,
  },
  strategyContainer: {
    marginBottom: 30,
    gap: 15,
  },
  strategyTitle: {
    fontSize: 18,
    color: "#AE9D7F",
    fontWeight: "600",
  },
  strategyText: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 5,
  },
});
