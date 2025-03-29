import AnimatedNumber from "@/components/AnimatedNumber";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type DataItem = {
	label: string;
	value: string | number;
};

const dummyData: DataItem[] = [
	{ label: "Total Sales", value: "$12,345" },
	{ label: "Orders", value: 245 },
	{ label: "Products", value: 67 },
	{ label: "Customers", value: 1234 },
];

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
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hello (business name here)</Text>
			{/* <Text style={styles.title}>Business Dashboard</Text> */}
			<FlatList
				data={dummyData}
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
		// textAlign: 'center',
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
