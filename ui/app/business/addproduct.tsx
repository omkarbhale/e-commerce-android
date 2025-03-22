import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	Image,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddProduct = () => {
	// States to manage form inputs
	const [productName, setProductName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageUri, setImageUri] = useState<string>("");

	// Handle image selection
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

			{/* <Button title="Add Product" /> */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={() =>
					Alert.alert("TODO", "Submission logic not implemented", [
						{ text: "Implement" },
						{ text: "Ignore" },
					])
				}
			>
				<Text style={styles.submitButtonText}>Submit</Text>
			</TouchableOpacity>

			<View style={styles.preview}>
				<Text>TODO: Remove product review</Text>
				<Text></Text>
				<Text style={styles.previewText}>
					Product Preview:
					{"\n"}Name: {productName}
					{"\n"}Price: {price}
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
