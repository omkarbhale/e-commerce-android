import { Stack, Tabs } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return <>
  <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  </>
}
