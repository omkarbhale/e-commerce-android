import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";

interface AnimatedNumberProps {
	value: number;
	style?: object;
	duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
	value,
	style,
	duration = 1000,
}) => {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		const listenerId = animatedValue.addListener(({ value }) => {
			setDisplayValue(Math.floor(value)); // Keeps values clean and whole
		});

		Animated.timing(animatedValue, {
			toValue: value,
			duration,
			useNativeDriver: false,
		}).start();

		return () => animatedValue.removeListener(listenerId); // Clean up listener
	}, [value]);

	return <Text style={style}>{displayValue.toLocaleString()}</Text>;
};

export default AnimatedNumber;
