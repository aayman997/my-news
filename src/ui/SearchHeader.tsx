import backGroundImg from "/newsPaper.jpg";
import { HiOutlineSearch } from "react-icons/hi";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchHeaderProps {
	searchError: string;
}

const SearchHeader = ({ searchError }: SearchHeaderProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState(() => {
		return searchParams.get("query") ?? "";
	});
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearchParams({ query: query });
	};

	return (
		<header
			className="absolute left-0 right-0 mt-[-33px] flex h-[350px] w-full items-center justify-center before:absolute before:inset-0 before:backdrop-blur-[2px] before:backdrop-brightness-75 before:content-['']"
			style={{ background: `url(${backGroundImg}) center/cover no-repeat fixed` }}
		>
			<div className="relative z-[1] text-center">
				<h3 className="mb-5 text-3xl font-bold text-white">search for article</h3>
				<form className="relative h-[40px] w-[320px] rounded-full bg-teal-50" onSubmit={handleSearch}>
					<input
						className="absolute inset-0 rounded-full bg-none"
						placeholder="type keyword"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					{searchError && <span className="text-xs text-red-500">{searchError}</span>}
					<button className="absolute bottom-[1px] right-[2px] top-[1px] z-[1] flex aspect-square items-center justify-center rounded-r-full border-none bg-teal-200 text-xl transition-all duration-300 hover:bg-teal-500">
						<HiOutlineSearch />
					</button>
				</form>
			</div>
		</header>
	);
};
export default SearchHeader;
