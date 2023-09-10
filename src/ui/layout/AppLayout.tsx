import { Outlet, useLocation, useNavigation } from "react-router-dom";
import AppNav from "./AppNav.tsx";
import AppFooter from "./AppFooter.tsx";
import Loader from "../Loader.tsx";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";

const AppLayout = () => {
	const navigation = useNavigation();
	const location = useLocation();
	const isLoading = navigation.state === "loading";
	const { setLocationHistory } = useAuth();
	const excludedPaths = ["/register", "/"];
	const shouldExcludePath = excludedPaths.some((path) => location.pathname === path);

	useEffect(() => {
		if (!shouldExcludePath) {
			localStorage.setItem("locationHistory", location.pathname + location.search);
			setLocationHistory(localStorage.getItem("locationHistory") ?? "/");
		}
	}, [location, setLocationHistory, shouldExcludePath]);

	return (
		<div className="flex h-screen flex-col">
			{isLoading && <Loader />}
			<AppNav />
			<main className="container mx-auto mb-[45px] mt-[90px] grow px-3 lg:px-0">
				<Outlet />
			</main>
			<AppFooter />
		</div>
	);
};
export default AppLayout;
