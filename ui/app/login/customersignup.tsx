import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { serverUrl, loggingEnabled } from "@/constants"; // Import serverUrl and loggingEnabled
import { useAuth } from "@/contexts/AuthenticationContext"; // Import useAuth

export default function CustomerSignup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useAuth(); // Access login from context

	const handleSignup = async () => {
		if (loggingEnabled) console.log("CustomerSignup: handleSignup called");
		if (loggingEnabled) console.log("CustomerSignup: name =", name);
		if (loggingEnabled) console.log("CustomerSignup: email =", email);
		if (loggingEnabled) console.log("CustomerSignup: password =", password);

		const response = await fetch(`${serverUrl}/auth/customer/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		const data = await response.json();
		if (loggingEnabled) console.log("CustomerSignup: response =", response);
		if (loggingEnabled) console.log("CustomerSignup: data =", data);

		if (response.ok) {
			login("customer", data.token, {
				id: data.customer.id,
				name: data.customer.name,
				email: data.customer.email,
			}); // Pass user object to context
			Alert.alert("Success", "Signup successful");
		} else {
			Alert.alert(
				"Error",
				`${data.error || "Signup failed"}\nDetails: ${
					data.details || "No additional details"
				}`,
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Customer Signup</Text>
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
