import { useNavigate } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex h-full flex-col items-center justify-center gap-10 font-bold">
			<h1 className="text-4xl text-teal-500">Page not found 😢</h1>
			<button
				className="flex items-center gap-3 rounded border border-teal-500 px-12 py-4 text-xl capitalize leading-none text-teal-500 transition-all duration-300 hover:bg-teal-500 hover:text-white"
				onClick={() => navigate("/")}
			>
				<span className="text-2xl">
					<HiArrowLongLeft />
				</span>
				back to home
			</button>
		</div>
	);
};
export default NotFoundPage;
