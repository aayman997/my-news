import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/layout/AppLayout.tsx";
import Error from "./ui/Error.tsx";
import Home from "./ui/Home.tsx";
import Explore from "./features/articles/Explore.tsx";
import Register from "./features/user/Register.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/register", element: <Register /> },
			{
				path: "/explore",
				element: <Explore />,
				errorElement: <Error />,
			},
		],
	},
]);
const queryCLient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryCLient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
