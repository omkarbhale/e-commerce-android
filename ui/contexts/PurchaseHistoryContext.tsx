import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { useAuth } from "@/contexts/AuthenticationContext";
import { serverUrl } from "@/constants";

interface Transaction {
	id: number;
	title: string;
	quantity: number;
	totalPrice: number;
	date: string;
}

interface PurchaseHistoryContextProps {
	transactions: Transaction[];
	setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
	refreshTransactions: () => void;
}

const PurchaseHistoryContext = createContext<
	PurchaseHistoryContextProps | undefined
>(undefined);

export const PurchaseHistoryProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const { token, user } = useAuth();

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
				console.error("Failed to fetch transactions", data.error);
			}
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	useEffect(() => {
		if (user) fetchTransactions();
	}, [user]);

	const refreshTransactions = () => {
		fetchTransactions();
	};

	return (
		<PurchaseHistoryContext.Provider
			value={{ transactions, setTransactions, refreshTransactions }}>
			{children}
		</PurchaseHistoryContext.Provider>
	);
};

export const usePurchaseHistoryContext = () => {
	const context = useContext(PurchaseHistoryContext);
	if (!context) {
		throw new Error(
			"usePurchaseHistoryContext must be used within a PurchaseHistoryProvider",
		);
	}
	return context;
};
