import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import {
	AuthenticationProvider,
	useAuth,
} from "@/contexts/AuthenticationContext";

export default function Layout() {
	return (
		<AuthenticationProvider>
			<AuthenticatedContent />
		</AuthenticationProvider>
	);
}

function AuthenticatedContent() {
	const router = useRouter();
	const { isLoggedIn, role } = useAuth();

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace("/login/customerlogin");
			return;
		}
		if (role === "business") {
			router.replace("/business/dashboard");
			return;
		}
		if (role === "customer") {
			router.replace("/customer/feed"); // Redirect to customer feed
		}
	}, [isLoggedIn, role]);

	return <Slot />;
}
