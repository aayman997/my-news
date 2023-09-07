import newsAPIDTO from "../dto/newsAPIDTO.ts";

const apiNewsAPI = async (query: string, page: string = "1", sortBy = "publishedAt", sources?: string) => {
	console.log("query", query);
	if (query && sortBy === "publishedAt") {
		sortBy = "relevance";
	}
	const PAGE_SIZE = 10;
	const BASE_URL = import.meta.env.VITE_NEWSAPI_URL;
	const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
	const params: Record<string, string> = {
		apiKey: API_KEY,
		page: page,
		pageSize: PAGE_SIZE.toString(),
		sortBy,
		...(sources && { sources }),
		q: query,
	};
	const searchParams = new URLSearchParams(params);
	const url = BASE_URL + "everything?" + searchParams;

	const res = await fetch(url);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data);
	}
	return { ...data, articles: newsAPIDTO(data.articles) };
};
export default apiNewsAPI;
