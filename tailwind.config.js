/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./*.css",
		"./app/**/*.{js,jsx,ts,tsx}", // Include all your React Native files here
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {},
	},
	plugins: [],
};
