import { Animated, Image } from "react-native";
import { useEffect, useRef } from "react";
import { MarkerType } from "./mapTypes";

type MarkerProps = {
  type: MarkerType;
  coord: [number, number];
  visible: boolean;
};

const markerImages: Record<MarkerType, any> = {
  blue_Portal: require("../../assets/images/BluePortal.png"),
  red_Portal: require("../../assets/images/RedPortal.png"),
  bosses: require("../../assets/images/BossesIcon.png"),
  sanctuary: require("../../assets/images/SantuaryIcon.png"),
  mission: require("../../assets/images/flagMission.png"),
};

export default function MissionMarker({ type, coord, visible }: MarkerProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.Image
      source={markerImages[type]}
      style={{
        position: "absolute",
        top: coord[0],
        left: coord[1],
        width: 50,
        height: 50,
        opacity,
        transform: [{ scale: opacity }],
      }}
    />
  );
}
