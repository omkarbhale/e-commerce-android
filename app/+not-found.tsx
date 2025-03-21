import { View, StyleSheet, Text } from "react-native";
import { Link, Stack, Tabs } from "expo-router";
import React from "react";

export default function NotFoundScreen() {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.button}>Not found!</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
	},

	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff",
	},
});
