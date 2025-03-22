import { View, TextInput, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
	const router = useRouter();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View style={{ padding: 6, width: "70%", gap: 2 }}>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "gray",
						borderRadius: 4,
					}}
					placeholder="Business Username"
				/>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "gray",
						borderRadius: 4,
					}}
					placeholder="Password"
					secureTextEntry={true}
				/>
				<View style={{ borderRadius: 4 }}>
					<Button
						onPress={() => router.replace("/business/dashboard")}
						title="Log In"></Button>
				</View>
			</View>
		</View>
	);
}
