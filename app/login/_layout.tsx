import { Tabs } from "expo-router";

export default function LoginLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="customerlogin"
				options={{ title: "Customer Login" }}
			/>
			<Tabs.Screen
				name="bussinesslogin"
				options={{ title: "Bussiness Login" }}
			/>
		</Tabs>
	);
}
