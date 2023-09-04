import { Outlet, useNavigation } from "react-router-dom";
import AppNav from "./AppNav.tsx";
import AppFooter from "./AppFooter.tsx";
import Loader from "../Loader.tsx";

const AppLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	return (
		<div className="flex h-screen flex-col">
			{isLoading && <Loader />}
			<AppNav />
			<main className="container mx-auto mb-[45px] mt-[90px]">
				<Outlet />
			</main>
			<AppFooter />
		</div>
	);
};
export default AppLayout;
