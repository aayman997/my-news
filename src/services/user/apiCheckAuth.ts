import { TOKEN } from "../../utils/helpers.ts";

interface ApiCheckAuth {
	code: number;
	message: string;
}

const apiCheckAuth = async (token: string): Promise<ApiCheckAuth> => {
	if (token !== TOKEN) {
		localStorage.removeItem("user");
		return {
			code: 401,
			message: "unauthorized",
		};
	}
	return {
		code: 201,
		message: "authorized user",
	};
};
export default apiCheckAuth;
