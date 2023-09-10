import { Link, useLocation } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi2";
import { categories } from "../../utils/helpers.ts";
import SearchInput from "../SearchInput.tsx";
import Logo from "../Logo.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { HiOutlineLogout } from "react-icons/hi";

const AppNav = () => {
	const { user, logout } = useAuth();
	const location = useLocation();
	const notAuthorized = Object.entries(user).length === 0;

	return (
		<nav className="fixed left-0 right-0 top-0 z-10 border-b border-yellow-50 bg-teal-500 py-3 shadow-2xl">
			<div className="container mx-auto flex items-center gap-8">
				<Link to="/">
					<Logo />
				</Link>
				{!notAuthorized && (
					<ul className="ml-auto flex flex-nowrap items-center gap-8 font-medium capitalize text-teal-50">
						<li className="relative w-[180px] text-gray-500">
							<SearchInput headerSearch />
						</li>
						{categories.slice(0, 3).map((category) => (
							<li key={category}>
								<Link to={`/explore/${category}`}>{category}</Link>
							</li>
						))}
					</ul>
				)}
				{notAuthorized ? (
					!location.pathname.includes("/register") && (
						<Link to="/register" className="text-xl text-white">
							<div className="flex items-center gap-2 rounded-md border-2 px-2 py-1 text-sm font-medium">
								<span className="text-xl">
									<HiUserCircle />
								</span>
								<span>join now</span>
							</div>
						</Link>
					)
				) : (
					<div className="flex items-center gap-2 rounded-md border-2 px-2 py-1 text-sm font-medium text-white">
						<span className="text-xl">
							<HiUserCircle />
						</span>
						<span>Hello {user.user.username}</span>
						<button
							className="inline-block rounded p-1 text-xl transition-all duration-300 hover:bg-white hover:text-teal-500 hover:shadow-xl"
							title="logout"
							onClick={logout}
						>
							<HiOutlineLogout />
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};
export default AppNav;
