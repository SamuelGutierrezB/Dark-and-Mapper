import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { useState, useEffect } from "react";

export default function Layout() {
  const [fonstsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!fonstsLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      cormorantinfant: require("../../assets/fonts/CormorantInfant-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
            borderBottomColor: "#7F7A74",
          },
          headerTitleStyle: {
            fontFamily: "cormorantinfant",
          },
          headerTintColor: "#AE9D7F",
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#1c1c1c",
            width: 240,
          },
          drawerActiveTintColor: "#AE9D7F",
          drawerInactiveTintColor: "#ccc",
          drawerItemStyle: {
            marginBottom: 5,
          },
          drawerLabelStyle: {
            fontFamily: "cormorantinfant",
            fontSize: 18,
          },
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Cerrar sesión"
              labelStyle={{
                fontFamily: "cormorantinfant",
                fontSize: 18,
                color: "#F58382",
              }}
              onPress={async () => {
                await AsyncStorage.removeItem("user");
                router.replace("/screens/authentication");
              }}
            />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="map"
          options={{
            title: "Mapa",
            drawerLabel: "Mapa",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="merchants"
          options={{
            title: "Comerciantes",
            drawerLabel: "Comerciantes",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="bestiary"
          options={{
            title: "Bestiário",
            drawerLabel: "Bestiário",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="authentication"
          options={{
            title: "Login",
            drawerLabel: "Login",
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
