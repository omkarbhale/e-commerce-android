import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { serverUrl } from "@/constants"; // Import serverUrl

export default function CustomerLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		console.log("CustomerLogin: handleLogin called");
		console.log("CustomerLogin: email =", email);
		console.log("CustomerLogin: password =", password);

		try {
			const response = await fetch(`${serverUrl}/auth/customer/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			console.log("CustomerLogin: response =", response);
			console.log("CustomerLogin: data =", data);

			if (response.ok) {
				Alert.alert("Success", "Login successful");
			} else {
				Alert.alert("Error", data.error || "Login failed");
			}
		} catch (error) {
			console.error("CustomerLogin: error =", error);
			Alert.alert("Error", "An error occurred during login");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Customer Login</Text>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
				<Button title="Log In" color="#007BFF" onPress={handleLogin} />
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
