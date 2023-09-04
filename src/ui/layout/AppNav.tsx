import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi2";

function Logo() {
	return (
		<div>
			<span className="text-xl">🗞️</span>
			<span className="ml-2 font-bold text-gray-900">My News</span>
		</div>
	);
}

const categories = ["business", "entertainment", "technology", "health", "sports"];
const AppNav = () => {
	return (
		<nav className="fixed left-0 right-0 top-0 border-b border-yellow-50 bg-teal-500 py-3 shadow-2xl">
			<div className="container mx-auto flex items-center gap-8">
				<Link to="/">
					<Logo />
				</Link>
				<ul className="ml-auto flex flex-nowrap gap-8 font-medium capitalize text-teal-50">
					{categories.map((category) => (
						<li key={category}>
							<Link to={`/explore?category=${category}`}>{category}</Link>
						</li>
					))}
				</ul>
				<Link to="/register" className="text-xl text-white">
					<div className="flex items-center gap-2 rounded-md border-2 px-2 py-1 text-sm font-medium">
						<span className="text-xl">
							<HiUserCircle />
						</span>
						<span>join now</span>
					</div>
				</Link>
			</div>
		</nav>
	);
};
export default AppNav;
