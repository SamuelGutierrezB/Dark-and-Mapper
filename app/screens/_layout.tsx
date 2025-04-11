import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="map"
          options={{
            title: "Mapa",
            drawerLabel: "Mapa",
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
