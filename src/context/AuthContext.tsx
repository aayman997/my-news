import { createContext, useState, useContext, ReactNode, useCallback, useMemo } from "react";
import apiSignup from "../services/apiSignup.ts";

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

	const login = useCallback(async ({ username, email, password }: { username: string; email: string; password: string }) => {
		const data = await apiSignup({ username, email, password });
		if (data.code === 201) {
			setUser({
				token: data.token,
				user: {
					username: data.user.username,
					email: data.user.email,
				},
			});
			return data;
		} else {
			setUser({} as UserType);
			throw new Error("wrong data");
		}
	}, []);

	const logout = useCallback(async () => {
		setUser({} as UserType);
	}, []);

	const value = useMemo(() => {
		return {
			user,
			login,
			logout,
		};
	}, [login, logout, user]);

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
