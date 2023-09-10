import { createContext, useState, useContext, ReactNode, useCallback, useMemo, useEffect } from "react";
import apiSignup from "../services/user/apiSignup.ts";
import apiCheckAuth from "../services/user/apiCheckAuth.ts";

interface AuthContextType {
	login: ({ username, email, password }: { username: string; email: string; password: string }) => Promise<ApiSignupRes>;
	logout: () => Promise<void>;
	user: {
		token: string;
		user: {
			username: string;
			email: string;
		};
	};
}

type UserType = {
	token: string;
	user: {
		username: string;
		email: string;
	};
};

interface ApiSignupRes {
	code: number;
	message: string;
	token: string;
	user: {
		username: string;
		email: string;
	};
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserType>({} as UserType);

	const logout = useCallback(async () => {
		localStorage.removeItem("user");
		setUser({} as UserType);
	}, []);

	const login = useCallback(
		async ({ username, email, password }: { username: string; email: string; password: string }) => {
			const data = await apiSignup({ username, email, password });
			if (data.code === 201) {
				localStorage.setItem("user", JSON.stringify({ token: data.token, user: data.user }));
				setUser({
					token: data.token,
					user: {
						username: data.user.username,
						email: data.user.email,
					},
				});
				return data;
			} else {
				await logout();
				throw new Error("wrong data");
			}
		},
		[logout],
	);

	const checkUser = useCallback(async () => {
		const localStorageStr = localStorage.getItem("user");
		const localStorageObj = localStorageStr ? JSON.parse(localStorageStr) : "";
		const localStorageToken = localStorageObj.token;
		const token = user.token ?? localStorageToken;

		const data = await apiCheckAuth(token);
		if (data.code === 201) {
			setUser(localStorageObj);
		} else {
			await logout();
			throw new Error("session expired");
		}
	}, [logout, user.token]);

	const value = useMemo(() => {
		return {
			user,
			login,
			logout,
		};
	}, [login, logout, user]);

	useEffect(() => {
		checkUser();
	}, [checkUser]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("AuthContext was used outside AuthProvider");
	}
	return context;
};
export default AuthProvider;
