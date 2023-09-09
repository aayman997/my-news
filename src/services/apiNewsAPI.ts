import newsAPIDTO from "../dto/newsAPIDTO.ts";
import ArticlesResType from "../types/ArticlesRes.ts";
import ArticleType from "../types/Article.ts";
import PaginationType from "../types/Pagination.ts";

interface ApiNewsAPIData {
	status: string;
	totalResults: number;
	articles: ArticleType[];
}

interface ApiNewsAPIError {
	code: string;
	message: string;
	status: string;
}

type ApiResponse = ApiNewsAPIData | ApiNewsAPIError;

const apiNewsAPI = async (
	query?: string,
	page?: string,
	sortBy?: string,
	category?: string,
	sources?: string,
	from?: string,
	to?: string,
): Promise<ArticlesResType> => {
	console.log("apiNewsAPI categories", category);
	console.log("apiNewsAPI sources", sources);
	const PAGE_SIZE = 10;
	/* As this is a free API, it allows access to the first 100 articles only to I set this values */
	const LAST_AVAILABLE_PAGES = 10;
	const MAX_TOTAL_PAGES = PAGE_SIZE * LAST_AVAILABLE_PAGES;
	const BASE_URL = import.meta.env.VITE_NEWSAPI_URL;
	const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
	const params: Record<string, string> = {
		apiKey: API_KEY,
		pageSize: PAGE_SIZE.toString(),
		...(query && { q: query }),
		...(page && { page }),
		...(sortBy && { sortBy }),
		...(sources && { sources }),
		...(category && { category }),
		...(from && { from }),
		...(to && { to }),
	};
	const searchParams = new URLSearchParams(params);
	const url = BASE_URL + "everything?" + searchParams;

	const res = await fetch(url);
	const data: ApiResponse = await res.json();
	if (!res.ok) {
		const dataError = data as ApiNewsAPIError;
		if (dataError.code === "parameterInvalid") {
			return {
				articles: [],
				pagination: {} as PaginationType,
			};
		}
		throw new Error((data as ApiNewsAPIError).message || "Error Loading data");
	}
	return {
		articles: newsAPIDTO((data as ApiNewsAPIData).articles),
		pagination: {
			currentPage: Number(page ?? 1),
			pageSize: PAGE_SIZE,
			totalPages: (data as ApiNewsAPIData).totalResults > 100 ? LAST_AVAILABLE_PAGES : Math.ceil((data as ApiNewsAPIData).totalResults / PAGE_SIZE),
			totalResults: (data as ApiNewsAPIData).totalResults > 100 ? MAX_TOTAL_PAGES : (data as ApiNewsAPIData).totalResults,
		},
	};
};

export default apiNewsAPI;
