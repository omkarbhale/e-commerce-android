import { Tabs } from "expo-router";
import {
	AntDesign,
	Entypo,
	Fontisto,
	Ionicons,
} from "react-native-vector-icons"; // Import Ionicons
import { ProductProvider } from "@/contexts/ProductContext";

export default function LoginLayout() {
	return (
		<ProductProvider>
			<Tabs>
				<Tabs.Screen
					name="dashboard"
					options={{
						title: "Business Dashboard",
						tabBarIcon: ({ color, size }) => (
							<AntDesign
								name="dashboard"
								size={size}
								color={color}
							/>
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
					name="browseproducts"
					options={{
						title: "Browse Products",
						tabBarIcon: ({ color, size }) => (
							<Entypo name="list" size={size} color={color} />
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

				{/* Hides tab */}
				<Tabs.Screen name="[productId]" options={{ href: null }} />
			</Tabs>
		</ProductProvider>
	);
}
