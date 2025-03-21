import "../globals.css";
import { Slot, Stack, Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { verifyInstallation } from "nativewind";

const isLoggedIn = false;

export default function Layout() {
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace("/login/customerlogin");
		} else {
			router.replace("/+not-found");
		}
		// verifyInstallation();
	});

	return <Slot />;
}
