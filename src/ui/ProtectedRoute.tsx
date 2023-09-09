import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const ProtectedRoute = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (Object.entries(user).length === 0) {
			navigate("/register");
		}
	}, [navigate, user]);

	if (Object.entries(user).length) {
		return <Outlet />;
	}
};
export default ProtectedRoute;
