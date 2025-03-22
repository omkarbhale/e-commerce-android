import React from "react";
import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Product() {
	const { productId } = useLocalSearchParams();
	const router = useRouter();
	return (
		<>
			<Tabs.Screen
				options={{
					title:
						"Product: " +
						(typeof productId === "string"
							? productId
							: productId.join(",")),
				}}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>Product ID: {productId}</Text>
				<Button
					title="Go Back"
					onPress={() => router.replace(`/business/browseproducts`)}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		marginBottom: 12,
		// fontWeight: "bold",
	},
});
