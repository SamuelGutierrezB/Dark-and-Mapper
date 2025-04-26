import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function MissionDetails() {
  const navigation = useNavigation();

  const route = useRoute();
  const { mission, merchant } = route.params;

  return (
    <View
      style={{
        borderWidth: 1,
        backgroundColor: "#121212",
        borderColor: "#7F7A74",
        padding: 20,
        borderRadius: 25,
        height: "99%",
      }}
    >
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
      <View style={styles.merchantItem}>
        <Image source={{ uri: merchant.imageUrl }} style={styles.image} />
        <View style={{ width: "75%" }}>
          <Text style={styles.name}>Misiones de {merchant.name}</Text>
          <Text style={styles.phrase}>{merchant.phrase}</Text>
        </View>
      </View>

      <Text style={styles.title}>
        Misión {mission.missionID}: {mission.nombre}
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#ccc",
          width: "100%",
          marginBottom: 20,
        }}
      />

      <Text style={styles.description}>{mission.descripcion}</Text>
      <Text style={styles.rewardTitle}>Recompensas:</Text>
      {mission.recompensas.map((r, index) => (
        <Text key={index} style={styles.reward}>
          {r.cantidad}x {r.nombreDeItem}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: "#AE9D7F",
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  rewardTitle: {
    fontSize: 20,
    color: "#AE9D7F",
    marginBottom: 10,
  },
  reward: {
    fontSize: 16,
    color: "#ccc",
  },
  merchantItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 25,
    fontWeight: "500",
    color: "#AE9D7F",
    fontFamily: "cormorantinfant",
  },
  phrase: {
    fontSize: 16,
    fontWeight: "100",
    color: "#AE9D7F",
  },
});
