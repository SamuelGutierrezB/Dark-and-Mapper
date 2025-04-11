import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type RouteProps = RouteProp<RootStackParamList, "Quests">;

export default function MerchantQuests() {
  const route = useRoute<RouteProps>();
  const { merchantId } = route.params;

  const merchants = require("../../../assets/data/merchants.json");
  const merchant = merchants.find((m: any) => m.id === merchantId);

  if (!merchant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Comerciante no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Misiones de {merchant.name}</Text>
      <FlatList
        data={merchant.misiones}
        keyExtractor={(item) => item.numeroDeMision.toString()}
        renderItem={({ item }) => (
          <View style={styles.missionCard}>
            <Text style={styles.missionTitle}>
              Misión {item.numeroDeMision}: {item.nombre}
            </Text>
            <Text style={styles.description}>{item.descripcion}</Text>
            <Text style={styles.rewardTitle}>Recompensas:</Text>
            {item.recompensas.map((reward: any, index: number) => (
              <Text key={index} style={styles.reward}>
                • {reward.nombreDeItem} x{reward.cantidad}
              </Text>
            ))}
          </View>
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#AE9D7F",
    fontWeight: "600",
    marginBottom: 15,
  },
  missionCard: {
    backgroundColor: "#2A2A2A",
    padding: 15,
    borderRadius: 20,
    borderColor: "#7F7A74",
    borderWidth: 1,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#ddd",
    marginVertical: 5,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#AE9D7F",
    marginTop: 10,
  },
  reward: {
    fontSize: 14,
    color: "#ccc",
    paddingLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 40,
  },
});
