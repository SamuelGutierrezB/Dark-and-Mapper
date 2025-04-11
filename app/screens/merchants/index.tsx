// components/MerchantList.tsx
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

export default function merchants() {
  const merchants = require("../../../assets/data/merchants.json");

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
      <FlatList
        data={merchants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 10,
              borderRadius: 25,
              backgroundColor: "#2A2A2A",
            }}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    gap: 10,
  },
  merchantItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 80,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#AE9D7F",
    fontFamily: "cormorantinfant",
  },
});
