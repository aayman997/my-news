/** @type {import("tailwindcss").Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: "Ubuntu, sans-serif",
		},
		extend: {
			height: {
				screen: "100dvh",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
