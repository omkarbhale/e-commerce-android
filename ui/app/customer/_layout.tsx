import { Tabs } from "expo-router";
import { Ionicons, Fontisto } from "react-native-vector-icons";

export default function CustomerLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="feed"
				options={{
					title: "Product Feed",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="list" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="purchasehistory"
				options={{
					title: "Purchase History",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="receipt" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Fontisto name="person" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
