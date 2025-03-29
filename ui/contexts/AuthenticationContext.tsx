import React, { createContext, useState, useContext, ReactNode } from "react";

type UserRole = "customer" | "business" | null;

interface AuthContextProps {
	isLoggedIn: boolean;
	role: UserRole;
	token: string | null;
	user: { id: number; name: string; email: string } | null; // Add user object
	login: (
		role: UserRole,
		token: string,
		user: { id: number; name: string; email: string },
	) => void; // Update login signature
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
	} | null>(null); // Add user state

	const login = (
		role: UserRole,
		token: string,
		user: { id: number; name: string; email: string },
	) => {
		setIsLoggedIn(true);
		setRole(role);
		setToken(token);
		setUser(user); // Store user object
	};

	const logout = () => {
		setIsLoggedIn(false);
		setRole(null);
		setToken(null);
		setUser(null); // Clear user object
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
