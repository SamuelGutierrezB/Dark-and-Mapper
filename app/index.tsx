// app/index.tsx
import { Redirect } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      console.log("Stored user:", storedUser);
      if (storedUser) {
        router.replace("../screens/map"); // o donde quieras mandar al usuario si ya está logueado
      }
    };

    checkSession();
  }, []);
  return <Redirect href="/screens/authentication" />;
}
