import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { serverUrl } from "@/constants"; // Import serverUrl

export default function BusinessSignup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async () => {
		console.log("BusinessSignup: handleSignup called");
		console.log("BusinessSignup: name =", name);
		console.log("BusinessSignup: email =", email);
		console.log("BusinessSignup: password =", password);

		try {
			const response = await fetch(`${serverUrl}/auth/business/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});
			const data = await response.json();
			console.log("BusinessSignup: response =", response);
			console.log("BusinessSignup: data =", data);

			if (response.ok) {
				Alert.alert("Success", "Signup successful");
			} else {
				Alert.alert(
					"Error",
					`${data.error || "Signup failed"}\nDetails: ${
						data.details || "No additional details"
					}`,
				);
			}
		} catch (error) {
			console.error("BusinessSignup: error =", error);
			Alert.alert("Error", "An error occurred during signup");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Business Signup</Text>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={name}
					onChangeText={setName}
				/>
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
				<Button
					title="Sign Up"
					color="#4CAF50"
					onPress={handleSignup}
				/>
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
