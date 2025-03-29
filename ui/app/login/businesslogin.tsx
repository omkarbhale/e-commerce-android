import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { serverUrl, loggingEnabled } from "@/constants"; // Import serverUrl and loggingEnabled
import { useRouter } from "expo-router"; // Import useRouter
import { useAuth } from "@/contexts/AuthenticationContext"; // Import useAuth

export default function BusinessLogin() {
	const router = useRouter(); // Initialize router
	const { login } = useAuth(); // Access login from context
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (loggingEnabled) console.log("BusinessLogin: handleLogin called");
		if (loggingEnabled) console.log("BusinessLogin: email =", email);
		if (loggingEnabled) console.log("BusinessLogin: password =", password);

		try {
			const response = await fetch(`${serverUrl}/auth/business/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (loggingEnabled)
				console.log("BusinessLogin: response =", response);
			if (loggingEnabled) console.log("BusinessLogin: data =", data);

			if (response.ok) {
				login("business", data.token); // Update context
				Alert.alert("Success", "Login successful");
				// router.push("/business/dashboard"); // Navigate to dashboard
			} else {
				Alert.alert(
					"Error",
					`${data.error || "Login failed"}\nDetails: ${
						data.details || "No additional details"
					}`,
				);
			}
		} catch (error) {
			if (loggingEnabled) console.error("BusinessLogin: error =", error);
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
