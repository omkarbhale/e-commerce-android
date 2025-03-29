import React, { createContext, useState, useContext, ReactNode } from "react";

type UserRole = "customer" | "business" | null;

interface AuthContextProps {
	isLoggedIn: boolean;
	role: UserRole;
	token: string | null;
	login: (role: UserRole, token: string) => void;
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

	const login = (role: UserRole, token: string) => {
		setIsLoggedIn(true);
		setRole(role);
		setToken(token);
	};

	const logout = () => {
		setIsLoggedIn(false);
		setRole(null);
		setToken(null);
	};

	return (
		<AuthenticationContext.Provider
			value={{ isLoggedIn, role, token, login, logout }}>
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
