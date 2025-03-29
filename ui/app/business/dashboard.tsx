import AnimatedNumber from "@/components/AnimatedNumber";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { serverUrl, loggingEnabled } from "@/constants";
import { useAuth } from "@/contexts/AuthenticationContext";

type DataItem = {
	label: string;
	value: string | number;
};

const renderItem = ({ item }: { item: DataItem }) => (
	<View style={styles.card}>
		<Text style={styles.label}>{item.label}</Text>
		{typeof item.value === "number" ? (
			<AnimatedNumber value={item.value} style={styles.value} />
		) : (
			<Text style={styles.value}>{item.value}</Text>
		)}
	</View>
);

export default function Dashboard() {
	const { token, user } = useAuth();
	const [dashboardData, setDashboardData] = useState<DataItem[]>([]);

	useEffect(() => {
		const fetchDashboardData = async () => {
			if (loggingEnabled)
				console.log("Dashboard: fetchDashboardData called");
			try {
				const response = await fetch(
					`${serverUrl}/dashboard/business/${user?.id}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();
				if (loggingEnabled)
					console.log("Dashboard: response =", response);
				if (loggingEnabled) console.log("Dashboard: data =", data);

				// Showing only top 1 product out of received top 3, if it exists
				if (data.topProducts && data.topProducts.length > 0) {
					data.topProducts = [data.topProducts[0]];
				}

				if (response.ok) {
					setDashboardData([
						{
							label: "Total Products Added",
							value: data.totalProductsAdded,
						},
						{
							label: "Total Products Sold",
							value: data.totalProductsSold,
						},
						{
							label: "Total Revenue",
							value: `$${data.totalRevenue}`,
						},
						{
							label: "Revenue Past Month",
							value: `$${data.revenuePastMonth}`,
						},
						...data.topProducts.map((product: any) => ({
							label: `Top Product: ${product.productName}`,
							value: product.totalSold,
						})),
					]);
				} else {
					Alert.alert(
						"Error",
						`${data.error || "Failed to fetch dashboard data"}\nDetails: ${
							data.details || "None"
						}`,
					);
				}
			} catch (error) {
				if (loggingEnabled) console.error("Dashboard: error =", error);
				Alert.alert(
					"Error",
					"An error occurred while fetching dashboard data",
				);
			}
		};

		fetchDashboardData();
	}, [token, user]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hello {user?.name}</Text>
			<FlatList
				data={dashboardData}
				renderItem={renderItem}
				keyExtractor={(item) => item.label}
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
	},
	label: {
		fontSize: 16,
		color: "#6c757d",
	},
	value: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
