import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function NotFoundScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Profile</Text>
			<View style={{ borderRadius: 4, marginTop: 24 }}>
				<Button
					onPress={() => router.replace("/login/businesslogin")}
					title="Log out"></Button>
			</View>
		</View>
	);
}
