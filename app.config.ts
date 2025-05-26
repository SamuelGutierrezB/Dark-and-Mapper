import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "Dark-and-Mapper",
  name: "Dark-and-Mapper",
  android: {
    package: "com.samuelgutierrezb.darkandmapper",
  },
});
