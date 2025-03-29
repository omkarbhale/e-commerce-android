import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React from "react";

export default function BusinessLogin() {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Business Login</Text>
			<View style={styles.form}>
				<TextInput style={styles.input} placeholder="Business Name" />
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry={true}
				/>
				<Button title="Log In" color="#007BFF" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	form: {
		width: "100%",
		maxWidth: 400,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		backgroundColor: "#fff",
	},
});
