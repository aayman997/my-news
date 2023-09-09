import backGroundImg from "/newsPaper.jpg";
import SearchInput from "./SearchInput.tsx";

const SearchHeader = () => {
	return (
		<header
			className="absolute left-0 right-0 mt-[-33px] flex h-[350px] w-full items-center justify-center before:absolute before:inset-0 before:backdrop-blur-[2px] before:backdrop-brightness-75 before:content-['']"
			style={{ background: `url(${backGroundImg}) center/cover no-repeat fixed` }}
		>
			<div className="relative z-[1] text-center">
				<h3 className="mb-5 text-3xl font-bold text-white">search for article</h3>
				<SearchInput />
			</div>
		</header>
	);
};
export default SearchHeader;
