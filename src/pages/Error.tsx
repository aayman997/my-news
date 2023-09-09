import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError() as Error;
	const navigate = useNavigate();
	console.log("________________________________________________");
	console.log("error", error);
	console.log("________________________________________________");
	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>{error.message}</p>
			<button className="text-sm text-blue-500 hover:text-blue-600 hover:underline" onClick={() => navigate(-1)}>
				&larr; Back to menu
			</button>
		</div>
	);
};
export default ErrorPage;
