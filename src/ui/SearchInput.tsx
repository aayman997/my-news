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
		<form className="relative h-[40px] w-full rounded-full bg-teal-50" onSubmit={handleSearch}>
			<input className="absolute inset-0 rounded-full bg-none" placeholder="type keyword" value={query} onChange={(e) => setQuery(e.target.value)} />
			<button className="absolute bottom-[1px] right-[2px] top-[1px] z-[1] flex aspect-square items-center justify-center rounded-r-full border-none bg-teal-200 text-xl transition-all duration-300 hover:bg-teal-500">
				<HiOutlineSearch />
			</button>
		</form>
	);
};
export default SearchInput;
