import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { serverUrl } from "@/constants"; // Import serverUrl

export default function BusinessLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		console.log("BusinessLogin: handleLogin called");
		console.log("BusinessLogin: email =", email);
		console.log("BusinessLogin: password =", password);

		try {
			const response = await fetch(`${serverUrl}/auth/business/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			console.log("BusinessLogin: response =", response);
			console.log("BusinessLogin: data =", data);

			if (response.ok) {
				Alert.alert("Success", "Login successful");
			} else {
				Alert.alert("Error", data.error || "Login failed");
			}
		} catch (error) {
			console.error("BusinessLogin: error =", error);
			Alert.alert("Error", "An error occurred during login");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Business Login</Text>
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
