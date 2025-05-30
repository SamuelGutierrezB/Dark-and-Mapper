import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import Toast from "react-native-toast-message";

export default function MerchantQuests() {
  const navigation = useNavigation();
  const route = useRoute();
  const { merchantId } = route.params;

  const [completedMissions, setCompletedMissions] = useState<{
    [key: number]: boolean;
  }>({});

  const merchants = require("../../../assets/data/merchants.json");
  const merchant = merchants.find((m: any) => m.id === merchantId);

  // Cargar misiones completadas
  useEffect(() => {
    const loadCompletedMissions = async () => {
      try {
        const userId = "usuario123";
        const docRef = doc(db, "missionsCompleted", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data[merchantId]) {
            setCompletedMissions(data[merchantId]);
          }
        }
      } catch (error) {
        console.error("Error al cargar misiones:", error);
      }
    };

    loadCompletedMissions();
  }, [merchantId]);

  const saveCompletedMissions = async () => {
    try {
      const userId = "usuario123";
      await setDoc(
        doc(db, "missionsCompleted", userId),
        {
          [merchantId]: completedMissions,
        },
        { merge: true }
      );
      Toast.show({
        type: "success",
        text1: "Progreso guardado",
        position: "bottom",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      Toast.show({
        type: "error",
        text1: "Error al guardar",
      });
    }
  };

  const sections = [
    { title: "Fase 1", data: merchant.missions.phase1 },
    { title: "Fase 2", data: merchant.missions.phase2 },
    { title: "Fase 3", data: merchant.missions.phase3 },
  ];

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
        onPress={() => navigation.navigate("index")}
      >
        <AntDesign name="back" size={35} color="#AE9D7F" />
      </TouchableOpacity>
      <View style={styles.merchantItem}>
        <Image source={{ uri: merchant.imageUrl }} style={styles.image} />
        <View style={{ width: "75%" }}>
          <Text style={styles.name}>Misiones de {merchant.name}</Text>
          <Text style={styles.phrase}>{merchant.phrase}</Text>
        </View>
      </View>

      {/*     Phases       */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.missionID.toString()}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.title}>{section.title}</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#ccc",
                width: "100%",
                marginBottom: 20,
              }}
            />
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.missionCard}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("MissionDetails", {
                  mission: item,
                  merchant: merchant,
                })
              }
            >
              <Text style={styles.missionTitle}>
                Misión {item.missionID}: {item.nombre}
              </Text>
              <Text style={styles.description}>{item.descripcion}</Text>
            </TouchableOpacity>
            <BouncyCheckbox
              isChecked={!!completedMissions[item.missionID]}
              onPress={(newValue) => {
                setCompletedMissions((prev) => ({
                  ...prev,
                  [item.missionID]: newValue,
                }));
              }}
              style={{ width: 20, height: 20 }}
            />
          </View>
        )}
        contentContainerStyle={{ gap: 10 }}
      />
      {/*     Phases       */}

      <TouchableOpacity
        style={{ marginTop: 30, alignSelf: "center" }}
        onPress={saveCompletedMissions}
      >
        <Text style={{ color: "#AE9D7F", fontSize: 16 }}>Guardar progreso</Text>
      </TouchableOpacity>
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
        }}
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
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#AE9D7F",
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
