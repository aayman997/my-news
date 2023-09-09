interface ApiSignupParamsType {
	username: string;
	email: string;
	password: string;
}

interface ApiSignupRes {
	code: number;
	message: string;
	token: string;
	user: {
		username: string;
		email: string;
	};
}

const apiSignup = async ({ username, email, password }: ApiSignupParamsType): Promise<ApiSignupRes> => {
	let passLogin = true;

	if (password.toString() !== "123456") {
		passLogin = false;
	}

	if (!passLogin) {
		localStorage.removeItem("user");
		return {
			code: 401,
			message: "unauthorized",
		} as ApiSignupRes;
	}
	const data = {
		code: 201,
		message: "user created successfully",
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
		user: {
			username,
			email,
		},
	};
	localStorage.setItem("user", JSON.stringify({ token: data.token, user: data.user }));
	return data;
};
export default apiSignup;
