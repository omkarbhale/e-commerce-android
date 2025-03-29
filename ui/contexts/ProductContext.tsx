import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/components/BusinessProductList";

interface ProductContextProps {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
	undefined,
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([]);

	return (
		<ProductContext.Provider value={{ products, setProducts }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error(
			"useProductContext must be used within a ProductProvider",
		);
	}
	return context;
};
