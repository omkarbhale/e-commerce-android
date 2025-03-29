import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ProductList, { Product } from "@/components/BusinessProductList";
import { useRouter } from "expo-router";
import { serverUrl, loggingEnabled } from "@/constants";
import { useAuth } from "@/contexts/AuthenticationContext";

export default function BrowseProducts() {
	const router = useRouter();
	const { user, token } = useAuth();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			if (!user?.id) return;

			try {
				const response = await fetch(
					`${serverUrl}/product/business/${user.id}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();

				if (loggingEnabled) console.log("Fetched products:", data);

				if (response.ok) {
					setProducts(data);
				} else {
					console.error("Failed to fetch products", data);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, [user, token]);

	const handleDeleteProduct = async (product: Product) => {
		try {
			const response = await fetch(`${serverUrl}/product/${product.id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setProducts((prevProducts) =>
					prevProducts.filter((p) => p.id !== product.id),
				);
				Alert.alert("Success", "Product deleted successfully");
				if (loggingEnabled) console.log("Product deleted successfully");
			} else {
				const data = await response.json();
				Alert.alert(
					"Error",
					`Failed to delete product: ${data.error || "Unknown error"}\nDetails: ${
						data.details || "No additional details"
					}`,
				);
				console.error("Failed to delete product", data);
			}
		} catch (error: any) {
			Alert.alert("Error", `Error deleting product: ${error.message}`);
			console.error("Error deleting product:", error);
		}
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
				onDeleteProduct={handleDeleteProduct}
			/>
		</View>
	);
}
