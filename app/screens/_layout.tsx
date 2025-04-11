import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import * as Font from "expo-font";
import { useState, useEffect } from "react";

export default function Layout() {
  const [fonstsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fonstsLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    Font.loadAsync({
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
          name="authentication"
          options={{
            title: "Login",
            drawerLabel: "Login",
            headerShown: true,
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
