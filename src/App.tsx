import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/layout/AppLayout.tsx";
import Error from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";
import Explore from "./features/articles/Explore.tsx";
import Register from "./features/user/Register.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Search from "./pages/Search.tsx";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/register", element: <Register /> },
			{ path: "/search", element: <Search /> },
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
