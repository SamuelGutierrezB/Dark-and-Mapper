// components/MerchantList.tsx
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

export default function merchants() {
  const navigation = useNavigation();
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
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MerchantQuests", { merchantId: item.id })
            }
            style={styles.merchantItem}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={{ width: "75%" }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phrase}>{item.phrase}</Text>
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
  },
  merchantItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
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
