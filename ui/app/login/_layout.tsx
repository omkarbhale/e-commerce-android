import { Tabs } from "expo-router";
import { Ionicons } from "react-native-vector-icons"; // Import Ionicons

export default function LoginLayout() {
	return (
		<Tabs>
			{/* Customer Login Tab */}
			<Tabs.Screen
				name="customerlogin"
				options={{
					title: "Customer Login",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} /> // Icon for customer login
					),
				}}
			/>

			{/* Customer Signup Tab */}
			<Tabs.Screen
				name="customersignup"
				options={{
					title: "Customer Signup",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-add" size={size} color={color} /> // Icon for customer signup
					),
				}}
			/>

			{/* Business Login Tab */}
			<Tabs.Screen
				name="businesslogin"
				options={{
					title: "Business Login",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="business" size={size} color={color} /> // Icon for business login
					),
				}}
			/>

			{/* Business Signup Tab */}
			<Tabs.Screen
				name="businesssignup"
				options={{
					title: "Business Signup",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="business-outline"
							size={size}
							color={color}
						/> // Icon for business signup
					),
				}}
			/>
		</Tabs>
	);
}
