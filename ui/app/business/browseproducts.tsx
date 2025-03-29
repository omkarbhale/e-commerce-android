import { View, Text } from "react-native";
import React from "react";
import ProductList, { Product } from "@/components/BusinessProductList";
import { useRouter } from "expo-router";

const products = [
	{ id: "1", name: "Wireless Headphones", price: 59.99 },
	{ id: "2", name: "Gaming Mouse", price: 29.99 },
	{ id: "3", name: "Smartwatch", price: 99.99 },
	{ id: "4", name: "Wireless Headphones", price: 59.99 },
	{ id: "5", name: "Gaming Mouse", price: 29.99 },
	{ id: "6", name: "Smartwatch", price: 99.99 },
];

export default function BrowseProducts() {
	const router = useRouter();

	const handleProductPress = (product: Product) => {
		// Alert.alert(
		// 	"Product Selected",
		// 	`${product.name} - $${product.price.toFixed(2)}`,
		// );

		router.push(`/business/${product.id}`);
	};

	return (
		<View>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					padding: 16,
				}}>
				Your Products
			</Text>
			<ProductList
				products={products}
				onProductPress={handleProductPress}
			/>
		</View>
	);
}
