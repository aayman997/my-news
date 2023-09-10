import { Link, useLocation } from "react-router-dom";
import { HiUserCircle, HiBars3 } from "react-icons/hi2";
import { categories } from "../../utils/helpers.ts";
import SearchInput from "../SearchInput.tsx";
import Logo from "../Logo.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react";

const AppNav = () => {
	const { user, logout } = useAuth();
	const location = useLocation();
	const notAuthorized = Object.entries(user).length === 0;
	const [showMenu, setShowMenu] = useState(false);
	return (
		<nav className="fixed left-0 right-0 top-0 z-20 border-b border-yellow-50 bg-teal-500 py-3 shadow-2xl">
			<div className="container mx-auto flex items-center justify-between gap-4 px-3 lg:px-0 xl:gap-8">
				<Link to="/">
					<Logo />
				</Link>
				{!notAuthorized && (
					<div>
						<button
							className="aspect-square rounded border border-teal-50 p-1 text-2xl text-teal-50 md:hidden"
							onClick={() => setShowMenu((cur) => !cur)}
						>
							<HiBars3 />
						</button>
					</div>
				)}
				{showMenu && <div className="fixed inset-0 z-10 h-full w-full backdrop-blur" onClick={() => setShowMenu(false)} />}
				<div
					className={`fixed bottom-0 left-0 top-0 z-[11] flex w-1/2 -translate-x-full flex-col flex-nowrap items-start gap-4 bg-teal-500 p-8 drop-shadow-2xl transition-transform duration-300 md:static md:flex md:w-auto md:flex-row md:items-center md:bg-transparent md:p-0 md:drop-shadow-none md:transition-none md:duration-0 xl:gap-8 ${
						showMenu ? "translate-x-0 " : "md:translate-x-0"
					} `}
				>
					<div className="md:hidden">
						<Logo />
					</div>
					{!notAuthorized && (
						<ul className="flex flex-col flex-nowrap gap-4 font-medium capitalize text-teal-50 md:flex-row md:items-center xl:gap-8">
							<li className="relative w-[150px] text-gray-500 lg:w-[180px]">
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
							<Link to="/register" className="md:text-md text-lg text-white xl:text-xl">
								<div className="flex gap-2 rounded-md border-2 px-1 py-1 text-sm font-medium md:items-center xl:px-2">
									<span className="text-lg xl:text-xl">
										<HiUserCircle />
									</span>
									<span>join now</span>
								</div>
							</Link>
						)
					) : (
						<div className="flex items-center gap-1 rounded-md border-2 px-1 py-1 text-sm font-medium text-white xl:gap-2 xl:px-2">
							<span className="text-lg xl:text-xl">
								<HiUserCircle />
							</span>
							<span>{user.user.username}</span>
							<button
								className="inline-block rounded p-1 text-lg transition-all duration-300 hover:bg-white hover:text-teal-500 hover:shadow-xl xl:text-xl"
								title="logout"
								onClick={logout}
							>
								<HiOutlineLogout />
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
export default AppNav;
