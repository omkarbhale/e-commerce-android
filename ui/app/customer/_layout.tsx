import { Tabs } from "expo-router";
import { Ionicons, Fontisto } from "react-native-vector-icons";
import { PurchaseHistoryProvider } from "@/contexts/PurchaseHistoryContext";

export default function CustomerLayout() {
	return (
		<PurchaseHistoryProvider>
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
							<Ionicons
								name="receipt"
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

				<Tabs.Screen
					name="product"
					options={{ href: null, title: "Product" }}
				/>
			</Tabs>
		</PurchaseHistoryProvider>
	);
}
