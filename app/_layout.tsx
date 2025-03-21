import { Slot, Stack, Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const isLoggedIn = false;

export default function Layout() {
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace("/login/login1");
		} else {
			router.replace("/+not-found");
		}
	});

	return <Slot />;
}
