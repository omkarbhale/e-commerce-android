import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { serverUrl, loggingEnabled } from "@/constants";
import { useAuth } from "@/contexts/AuthenticationContext";

interface Transaction {
	id: number;
	title: string;
	quantity: number;
	totalPrice: number;
	date: string;
}

export default function PurchaseHistory() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const { token, user } = useAuth();

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await fetch(
					`${serverUrl}/transactions/customer/${user?.id}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();

				if (response.ok) {
					setTransactions(data);
				} else {
					Alert.alert(
						"Error",
						data.error || "Failed to fetch transactions",
					);
				}
			} catch (error) {
				console.error("Error fetching transactions:", error);
				Alert.alert(
					"Error",
					"An error occurred while fetching transactions.",
				);
			}
		};

		fetchTransactions();
	}, [token, user]);

	const renderItem = ({ item }: { item: Transaction }) => {
		return (
			<View style={styles.card}>
				<Text style={styles.name}>{item.title}</Text>
				<Text style={styles.details}>
					Date:{" "}
					{new Date(item.date).toLocaleString(undefined, {
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
				<Text style={styles.details}>Quantity: {item.quantity}</Text>
				<Text style={styles.details}>
					Total Price: ${item.totalPrice.toFixed(2)}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Purchase History</Text>
			<FlatList
				data={transactions}
				keyExtractor={(item, index) =>
					item.id ? item.id.toString() : index.toString()
				}
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
		marginBottom: 5,
	},
	details: {
		fontSize: 14,
		color: "#6c757d",
		marginBottom: 5,
	},
});
