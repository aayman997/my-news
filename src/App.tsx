import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/layout/AppLayout.tsx";
import ErrorPage from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";
import Explore, { loader as categoryLoader } from "./features/articles/Explore.tsx";
import Register from "./features/user/Register.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Search from "./pages/Search.tsx";
import NotFoundPage from "./ui/NotFoundPage.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import AuthProvider from "./context/AuthContext.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/register",
				element: <Register />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{ path: "/", element: <Home /> },
					{ path: "/search", element: <Search /> },
					{
						path: "/explore/:category",
						element: <Explore />,
						loader: categoryLoader,
					},
				],
			},
			{ path: "*", element: <NotFoundPage /> },
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
		<AuthProvider>
			<QueryClientProvider client={queryCLient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	);
}

export default App;
