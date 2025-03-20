import { Slot, Stack, Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function Layout() {
  return <View style={{flex: 1}}>
    <Text style={{fontSize: 45}}>Header Area</Text>
    <Text>Header Area</Text>
    <Text>Header Area</Text>
    <Slot />
    <Text>Footer area</Text>
    <Text>Footer area</Text>
    <Text style={{fontSize: 45}}>Header Area</Text>
  </View>
}
