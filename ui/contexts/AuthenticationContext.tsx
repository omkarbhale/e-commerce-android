import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserRole = "customer" | "business" | null;

interface AuthContextProps {
	isLoggedIn: boolean;
	role: UserRole;
	token: string | null;
	user: { id: number; name: string; email: string } | null;
	login: (
		role: UserRole,
		token: string,
		user: { id: number; name: string; email: string },
	) => void;
	logout: () => void;
}

const AuthenticationContext = createContext<AuthContextProps | undefined>(
	undefined,
);

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [role, setRole] = useState<UserRole>(null);
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<{
		id: number;
		name: string;
		email: string;
	} | null>(null);

	useEffect(() => {
		const loadAuthState = async () => {
			try {
				const storedToken = await AsyncStorage.getItem("authToken");
				const storedRole = await AsyncStorage.getItem("authRole");
				const storedUser = await AsyncStorage.getItem("authUser");

				if (storedToken && storedRole && storedUser) {
					setIsLoggedIn(true);
					setRole(storedRole as UserRole);
					setToken(storedToken);
					setUser(JSON.parse(storedUser));
				} else {
					setIsLoggedIn(false);
					setRole(null);
					setToken(null);
					setUser(null);
				}
			} catch (error) {
				console.error("Failed to load auth state:", error);
			}
		};

		loadAuthState();
	}, []);

	const login = async (
		role: UserRole,
		token: string,
		user: { id: number; name: string; email: string },
	) => {
		setIsLoggedIn(true);
		setRole(role);
		setToken(token);
		setUser(user);

		try {
			await AsyncStorage.setItem("authToken", token);
			await AsyncStorage.setItem("authRole", role || "");
			await AsyncStorage.setItem("authUser", JSON.stringify(user));
		} catch (error) {
			console.error("Failed to save auth state:", error);
		}
	};

	const logout = async () => {
		setIsLoggedIn(false);
		setRole(null);
		setToken(null);
		setUser(null);

		try {
			await AsyncStorage.removeItem("authToken");
			await AsyncStorage.removeItem("authRole");
			await AsyncStorage.removeItem("authUser");
		} catch (error) {
			console.error("Failed to clear auth state:", error);
		}
	};

	return (
		<AuthenticationContext.Provider
			value={{ isLoggedIn, role, token, user, login, logout }}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthenticationContext);
	if (!context) {
		throw new Error(
			"useAuth must be used within an AuthenticationProvider",
		);
	}
	return context;
};
