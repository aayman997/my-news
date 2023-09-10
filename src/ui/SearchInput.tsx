import { HiOutlineSearch } from "react-icons/hi";
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchInput = ({ headerSearch = false }: { headerSearch?: boolean }) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState(() => {
		return searchParams.get("query") ?? "";
	});
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (headerSearch && !query) {
			return;
		}

		if (headerSearch) {
			navigate(`/search?query=${query}`);
			setQuery("");
		}

		setSearchParams({ query: query });
	};

	return (
		<form className="relative h-[32px] w-full rounded-md bg-teal-50 xl:h-[40px]" onSubmit={handleSearch}>
			<input
				className="absolute inset-0 rounded-md border-none bg-transparent font-normal placeholder:text-sm placeholder:capitalize placeholder:text-gray-500/50 focus:border-none focus:outline focus:outline-white"
				placeholder="type keyword"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button className="absolute bottom-[1px] right-[2px] top-[1px] z-[1] flex aspect-square items-center justify-center rounded-r-lg border-none bg-teal-100 text-xl text-teal-700 transition-all duration-300 hover:bg-teal-500 focus:outline focus:outline-teal-200">
				<HiOutlineSearch />
			</button>
		</form>
	);
};
export default SearchInput;
