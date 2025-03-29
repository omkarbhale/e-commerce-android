import { View, Text } from "react-native";
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

	const handleProductPress = (product: Product) => {
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
