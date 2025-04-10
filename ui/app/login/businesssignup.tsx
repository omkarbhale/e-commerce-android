import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { serverUrl, loggingEnabled } from "@/constants";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthenticationContext";

export default function BusinessSignup() {
	const router = useRouter();
	const { login } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	const handleSignup = async () => {
		if (loggingEnabled) console.log("BusinessSignup: handleSignup called");
		if (loggingEnabled) console.log("BusinessSignup: name =", name);
		if (loggingEnabled) console.log("BusinessSignup: email =", email);
		if (loggingEnabled) console.log("BusinessSignup: password =", password);
		if (loggingEnabled) console.log("BusinessSignup: address =", address);
		if (loggingEnabled) console.log("BusinessSignup: phone =", phone);

		try {
			const response = await fetch(`${serverUrl}/auth/business/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password, address, phone }),
			});
			const data = await response.json();
			if (loggingEnabled)
				console.log("BusinessSignup: response =", response);
			if (loggingEnabled) console.log("BusinessSignup: data =", data);

			if (response.ok) {
				login("business", data.token, {
					id: data.business.id,
					name: data.business.name,
					email: data.business.email,
					address: data.business.address,
					phone: data.business.phone,
				}); // Pass user object to context
				Alert.alert("Success", "Signup successful");
				router.replace("/customer/feed");
			} else {
				Alert.alert(
					"Error",
					`${data.error || "Signup failed"}\nDetails: ${
						data.details || "No additional details"
					}`,
				);
			}
		} catch (error) {
			if (loggingEnabled) console.error("BusinessSignup: error =", error);
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
					accessibilityLabel="Enter your name"
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					accessibilityLabel="Enter your email"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
					accessibilityLabel="Enter your password"
				/>
				<TextInput
					style={styles.input}
					placeholder="Address"
					value={address}
					onChangeText={setAddress}
					accessibilityLabel="Enter your address"
				/>
				<TextInput
					style={styles.input}
					placeholder="Phone"
					value={phone}
					onChangeText={setPhone}
					keyboardType="phone-pad"
					accessibilityLabel="Enter your phone number"
				/>
				<Button
					title="Sign Up"
					color="#4CAF50"
					onPress={handleSignup}
					accessibilityLabel="Sign up button"
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
