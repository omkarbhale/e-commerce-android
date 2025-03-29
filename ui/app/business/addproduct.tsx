import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	Image,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { serverUrl, loggingEnabled } from "@/constants";
import { useAuth } from "@/contexts/AuthenticationContext";
import { useProductContext } from "@/contexts/ProductContext";

const AddProduct = () => {
	const [productName, setProductName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageUri, setImageUri] = useState<string>("");

	const { user } = useAuth();
	const { setProducts } = useProductContext();

	const pickImage = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission required",
				"Please grant access to your gallery",
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	const handleSubmit = async () => {
		if (loggingEnabled) console.log("AddProduct: handleSubmit called");
		if (loggingEnabled)
			console.log("AddProduct: productName =", productName);
		if (loggingEnabled) console.log("AddProduct: price =", price);
		if (loggingEnabled) console.log("AddProduct: businessId =", user?.id);

		const response = await fetch(`${serverUrl}/product`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: productName,
				price: parseFloat(price),
				businessId: user?.id,
			}),
		});

		const data = await response.json();
		if (loggingEnabled) console.log("AddProduct: response =", response);
		if (loggingEnabled) console.log("AddProduct: data =", data);

		if (response.ok) {
			Alert.alert("Success", "Product added successfully");
			setProducts((prevProducts) => [...prevProducts, data]);
		} else {
			Alert.alert(
				"Error",
				`${data.error || "Failed to add product"}\nDetails: ${
					data.details || "No additional details"
				}`,
			);
		}
	};

	return (
		<View style={styles.container}>
			{/* <Text style={styles.title}>Add New Product</Text> */}

			<TextInput
				style={styles.input}
				placeholder="Product Name"
				value={productName}
				onChangeText={setProductName}
			/>

			<TextInput
				style={styles.input}
				placeholder="Price"
				value={price}
				keyboardType="numeric"
				onChangeText={setPrice}
			/>

			<TextInput
				style={styles.input}
				placeholder="Description"
				value={description}
				onChangeText={setDescription}
			/>

			<TouchableOpacity style={styles.imageButton} onPress={pickImage}>
				<Text style={styles.imageButtonText}>Pick an Image</Text>
			</TouchableOpacity>
			{imageUri ? (
				<Image source={{ uri: imageUri }} style={styles.image} />
			) : null}

			<TouchableOpacity
				style={styles.submitButton}
				onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>Submit</Text>
			</TouchableOpacity>

			<View style={styles.preview}>
				<Text>TODO: Remove product review</Text>
				<Text></Text>
				<Text style={styles.previewText}>
					Product Preview:
					{"\n"}Name: {productName}
					{"\n"}Price: {price}
					{"\n"}Business ID: {user?.id}
					{"\n"}Description: {description}
					{"\n"}Image: {imageUri ? "Selected" : "Not Selected"}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 12,
		paddingLeft: 8,
		borderRadius: 8,
	},
	imageButton: {
		borderColor: "#ccc",
		paddingVertical: 12,
		paddingLeft: 8,
		borderRadius: 8,
		marginBottom: 12,
		borderWidth: 1,
	},
	submitButton: {
		backgroundColor: "#007BFF",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 12,
	},
	imageButtonText: {
		color: "gray",
		textDecorationLine: "underline",
		// fontSize: 16,
		// fontWeight: "bold",
	},
	submitButtonText: {
		color: "white",
		// textDecorationLine: 'underline',
		fontSize: 16,
		fontWeight: "bold",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginTop: 10,
		marginBottom: 10,
	},
	preview: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
	},
	previewText: {
		fontSize: 16,
		color: "#333",
	},
});

export default AddProduct;
