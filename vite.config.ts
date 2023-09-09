import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react(), eslint()],
		server: {
			watch: {
				usePolling: true,
			},
			host: true,
			strictPort: true,
			port: 3000,
		},
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV),
		},
	};
});
