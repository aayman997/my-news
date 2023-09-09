import { useSearchParams } from "react-router-dom";
import SearchHeader from "../ui/SearchHeader.tsx";
import { useEffect, useState } from "react";
import apiNewsAPI from "../services/apiNewsAPI.ts";
import ArticlesList from "../features/articles/ArticlesList.tsx";
import PaginationType from "../types/Pagination.ts";
import ArticleType from "../types/Article.ts";
import Loader from "../ui/Loader.tsx";
import SearchFilter from "../ui/SearchFilter.tsx";

interface ArticlesType {
	articles: Partial<ArticleType>[];
	pagination: PaginationType;
}

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [articles, setArticles] = useState<ArticlesType>({} as ArticlesType);
	const [errorLoadingArticles, setErrorLoadingArticles] = useState(false);
	const [isLoadingArticles, setIsLoadingArticles] = useState(false);
	const [sortBy, setSortBy] = useState(() => {
		return searchParams.get("sortBy") ?? "publishedAt";
	});
	const [categories, setCategories] = useState<string[]>(() => {
		return searchParams?.get("categories")?.split(",") ?? [];
	});
	const [authors, setAuthors] = useState<string[]>(() => {
		return searchParams?.get("authors")?.split(",") ?? [];
	});
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [searchError, setSearchError] = useState("");

	useEffect(() => {
		const params = { ...Object.fromEntries([...searchParams]) };
		if (Object.entries(categories).length) {
			params.categories = categories.join(",");
		} else {
			delete params.categories;
		}
		setSearchParams(params);
	}, [categories, searchParams, setSearchParams]);

	useEffect(() => {
		const params = { ...Object.fromEntries([...searchParams]) };
		if (Object.entries(authors).length) {
			params.authors = authors.join(",");
		} else {
			delete params.authors;
		}
		setSearchParams(params);
	}, [authors, searchParams, setSearchParams]);

	useEffect(() => {
		setArticles(() => ({}) as ArticlesType);
		const query = searchParams.get("query");
		if (!query) {
			return setSearchError("Please type a keyword to search");
		}
		setIsLoadingArticles(true);
		setErrorLoadingArticles(false);
		const categoriesString = categories.join(",");
		const authorsString = authors.join(",");
		const page = searchParams.get("page") ?? "1";
		apiNewsAPI(query, page, sortBy, categoriesString, authorsString, startDate, endDate)
			.then((res) => setArticles(res))
			.catch(() => setErrorLoadingArticles(true))
			.finally(() => {
				setIsLoadingArticles(false);
			});
	}, [sortBy, searchParams, categories, authors, startDate, endDate]);
	console.log("articles", articles);
	return (
		<>
			<SearchHeader searchError={searchError} />

			<div className="flex items-start gap-10 pt-[380px]">
				<div className="basis-1/4">
					<SearchFilter
						setCategories={setCategories}
						setAuthors={setAuthors}
						setStartDate={setStartDate}
						setEndDate={setEndDate}
						startDate={startDate}
						endDate={endDate}
						categories={categories}
						authors={authors}
					/>
				</div>
				<div className="basis-3/4">
					{isLoadingArticles && <Loader />}
					{errorLoadingArticles && <p>Error happened while loading data 🥲</p>}
					{articles.articles?.length === 0 && <p className="text-center text-xl font-bold">please try another search criteria</p>}
					{articles.articles?.length > 0 && (
						<>
							<div className="mb-5 flex items-center justify-between">
								<h3 className="text-2xl font-bold text-teal-500">Search Results</h3>
								<div className="flex items-center justify-center gap-3">
									<span>sort by</span>
									<select
										className="h-[35px] w-[135px] rounded border border-teal-300 px-2 leading-none focus:border-2 focus:border-teal-500 focus:outline-none"
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
									>
										<option value="relevancy">relevancy</option>
										<option value="popularity">popularity</option>
										<option value="publishedAt">published at</option>
									</select>
								</div>
							</div>
							<ArticlesList articles={articles.articles} pagination={articles.pagination} small={false} />
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default Search;
