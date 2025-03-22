import { Tabs } from "expo-router";
import { AntDesign, Fontisto, Ionicons } from "react-native-vector-icons"; // Import Ionicons

export default function LoginLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="dashboard" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="addproduct"
				options={{
					title: "Add product",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="add-circle-outline"
							size={size}
							color={color}
						/>
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
