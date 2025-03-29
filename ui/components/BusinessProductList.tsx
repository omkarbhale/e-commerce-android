import React from "react";
import {
	FlatList,
	View,
	Text,
	Pressable,
	StyleSheet,
	Button,
} from "react-native";

export interface Product {
	id: string;
	name: string;
	price: number;
}

interface ProductListProps {
	products: Product[];
	onDeleteProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onDeleteProduct,
}) => {
	const renderItem = ({ item }: { item: Product }) => (
		<View style={styles.card}>
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.price}>${item.price.toFixed(2)}</Text>
			</View>
			<Button
				title="Delete"
				color="red"
				onPress={() => onDeleteProduct(item)}
			/>
		</View>
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	infoContainer: {
		flex: 1,
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
