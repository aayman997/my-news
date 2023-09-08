import newsAPIDTO from "../dto/newsAPIDTO.ts";
import ArticlesResType from "../types/ArticlesRes.ts";
import ArticleType from "../types/Article.ts";

interface ApiNewsAPIData {
	status: string;
	totalResults: number;
	articles: ArticleType[];
}

const apiNewsAPI = async (query: string, page?: string, sortBy?: string, sources?: string, from?: string, to?: string): Promise<ArticlesResType> => {
	const PAGE_SIZE = 10;
	const BASE_URL = import.meta.env.VITE_NEWSAPI_URL;
	const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
	const params: Record<string, string> = {
		apiKey: API_KEY,
		pageSize: PAGE_SIZE.toString(),
		q: query,
		...(page && { page }),
		...(sortBy && { sortBy }),
		...(sources && { sources }),
		...(from && { from }),
		...(to && { to }),
	};
	const searchParams = new URLSearchParams(params);
	const url = BASE_URL + "everything?" + searchParams;

	const res = await fetch(url);
	const data: ApiNewsAPIData = await res.json();
	if (!res.ok) {
		throw new Error("Error Loading data");
	}
	return {
		articles: newsAPIDTO(data.articles),
		pagination: {
			currentPage: page ?? "1",
			pageSize: PAGE_SIZE,
			totalPages: Math.ceil(data.totalResults / PAGE_SIZE),
			totalResults: data.totalResults,
		},
	};
};

export default apiNewsAPI;
