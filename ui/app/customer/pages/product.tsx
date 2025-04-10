import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Button,
	Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // Updated import
import { serverUrl } from "@/constants";
import { useAuth } from "@/contexts/AuthenticationContext";
import { usePurchaseHistoryContext } from "@/contexts/PurchaseHistoryContext";

interface ProductDetails {
	id: number;
	name: string;
	description: string;
	price: number;
	businessName: string;
	businessAddress: string; // Added field
	businessPhone: string; // Added field
}

export default function ProductPage() {
	const { id } = useLocalSearchParams(); // Updated to use useLocalSearchParams
	const [product, setProduct] = useState<ProductDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const { token, user } = useAuth();
	const { refreshTransactions } = usePurchaseHistoryContext();
	const router = useRouter();

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await fetch(`${serverUrl}/product/${id}`);
				const data = await response.json();

				if (response.ok) {
					setProduct(data);
				} else {
					console.error("Failed to fetch product details", data);
				}
			} catch (error) {
				console.error("Error fetching product details:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProductDetails();
		}
	}, [id]);

	const handleBuy = async (productId: number) => {
		try {
			const response = await fetch(`${serverUrl}/transactions/buy`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					productId,
					customerId: user?.id,
					quantity: 1, // Default quantity to 1 for now
				}),
			});

			const data = await response.json();

			if (response.ok) {
				Alert.alert("Success", "Product purchased successfully");

				// Trigger a re-fetch of transactions
				refreshTransactions();
				router.back(); // Navigate back after purchase
			} else {
				Alert.alert(
					"Error",
					data.error || "Failed to purchase product",
				);
			}
		} catch (error) {
			console.error("Error purchasing product:", error);
			Alert.alert(
				"Error",
				"An error occurred while purchasing the product.",
			);
		}
	};

	if (loading) {
		return (
			<ActivityIndicator
				size="large"
				color="#0000ff"
				style={styles.loader}
			/>
		);
	}

	if (!product) {
		return <Text style={styles.error}>Product not found</Text>;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Name</Text>
			<Text style={{ fontSize: 18, marginBottom: 18 }}>
				{product.name}
			</Text>

			<Text style={styles.title}>Business</Text>
			<Text style={{ fontSize: 18 }}>Name: {product.businessName}</Text>
			<Text style={{ fontSize: 18 }}>
				Address: {product.businessAddress || "N/A"}
			</Text>
			<Text style={{ fontSize: 18, marginBottom: 18 }}>
				Phone: {product.businessPhone || "N/A"}
			</Text>

			<Text style={styles.title}>Price</Text>
			<Text style={styles.price}>{product.price.toFixed(2)} ₹</Text>

			<Button
				title="Buy"
				onPress={() => handleBuy(product.id)}
				color="#4CAF50"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f8f9fa",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	businessName: {
		fontSize: 16,
		color: "#555",
		marginBottom: 10,
	},
	price: {
		fontSize: 18,
		color: "#4CAF50",
		marginBottom: 20,
	},
	description: {
		fontSize: 16,
		color: "#333",
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	error: {
		fontSize: 18,
		color: "red",
		textAlign: "center",
		marginTop: 20,
	},
});
