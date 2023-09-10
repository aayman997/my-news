import theGuardianDTO from "../../dto/theGuardianDTO.ts";
import ArticlesResType from "../../types/ArticlesRes.ts";

interface ArticlesRes extends ArticlesResType {
	orderBy?: string;
}

const apiTheGuardian = async (query?: string, page?: string, orderBy?: string, orderDate?: string): Promise<ArticlesRes> => {
	if (query && orderBy === "newest") {
		orderBy = "relevance";
	}
	const BASE_URL = import.meta.env.VITE_THEGUARDIAN_URL;
	const API_KEY = import.meta.env.VITE_THEGUARDIAN_API_KEY;
	const RESULTS_PER_PAGE = "15";
	const params: Record<string, string> = {
		"api-key": API_KEY,
		"show-fields": "body,byline,thumbnail",
		"page-size": RESULTS_PER_PAGE,
		...(query && { q: query }),
		...(page && { page }),
		...(orderBy && { "order-by": orderBy }),
		...(orderDate && { "order-date": orderDate }),
	};
	const searchParams = new URLSearchParams(params);
	const url = BASE_URL + "search?" + searchParams;
	const res = await fetch(url);
	const data = await res.json();
	if (!res.ok) {
		throw new Error("Error Loading data");
	}
	return {
		articles: theGuardianDTO(data.response.results),
		pagination: {
			currentPage: Number(data.response.currentPage),
			pageSize: Number(data.response.pageSize),
			totalPages: Number(data.response.pages),
			totalResults: Number(data.response.total),
		},
		orderBy: data.response.orderBy,
	};
};
export default apiTheGuardian;
