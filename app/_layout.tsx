import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

const isLoggedIn = false;

export default function Layout() {
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace("/login/customerlogin");
		} else {
			router.replace("/+not-found");
		}
	});

	return <Slot />;
}
