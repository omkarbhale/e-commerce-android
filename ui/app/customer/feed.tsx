import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, Button } from "react-native";
import { serverUrl, loggingEnabled } from "@/constants";
import { useAuth } from "@/contexts/AuthenticationContext";
import { usePurchaseHistoryContext } from "@/contexts/PurchaseHistoryContext";

interface Product {
	id: number;
	name: string;
	price: number;
	businessName: string; // Added business name
}

export default function CustomerFeed() {
	const [products, setProducts] = useState<Product[]>([]);
	const { token, user } = useAuth();
	const { refreshTransactions } = usePurchaseHistoryContext();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`${serverUrl}/product`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();

				if (response.ok) {
					setProducts(data);
				} else {
					Alert.alert(
						"Error",
						data.error || "Failed to fetch products",
					);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
				Alert.alert(
					"Error",
					"An error occurred while fetching products.",
				);
			}
		};

		fetchProducts();
	}, [token]);

	const renderItem = ({ item }: { item: Product }) => (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.price}>{item.price.toFixed(2)} ₹</Text>
			</View>
			<View style={styles.cardFooterRow}>
				<Text style={styles.businessName}>By: {item.businessName}</Text>
				<Button
					title="Buy"
					onPress={() => handleBuy(item.id)}
					color="#4CAF50"
				/>
			</View>
		</View>
	);

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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Available Products</Text>
			<FlatList
				data={products}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				contentContainerStyle={styles.list}
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
		marginBottom: 20,
	},
	list: {
		gap: 10,
	},
	card: {
		borderRadius: 12,
		padding: 15,
		backgroundColor: "#ffffff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		marginBottom: 10,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	businessName: {
		fontSize: 14,
		color: "#555",
	},
	price: {
		fontSize: 14,
		color: "#4CAF50",
		marginBottom: 10,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	cardFooterRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
