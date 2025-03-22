import React from "react";
import { FlatList, View, Text, Pressable, StyleSheet } from "react-native";

export interface Product {
	id: string;
	name: string;
	price: number;
}

interface ProductListProps {
	products: Product[];
	onProductPress: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onProductPress,
}) => {
	const renderItem = ({ item }: { item: Product }) => (
		<Pressable
			onPress={() => onProductPress(item)}
			style={({ pressed }) => [
				styles.card,
				pressed && { backgroundColor: "#f0f0f0" },
			]}>
			<Text style={styles.name}>{item.name}</Text>
			<Text style={styles.price}>${item.price.toFixed(2)}</Text>
		</Pressable>
	);

	return (
		<FlatList
			data={products}
			keyExtractor={(item) => item.id}
			renderItem={renderItem}
			contentContainerStyle={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 15,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	price: {
		fontSize: 14,
		color: "#4CAF50",
	},
});

export default ProductList;
