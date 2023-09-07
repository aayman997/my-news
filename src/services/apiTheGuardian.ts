import theGuardianDTO from "../dto/theGuardianDTO.ts";

const apiTheGuardian = async (query?: string, page: string = "1", resultsPerPage: number = 15, orderBy: string = "newest", orderDate: string = "published") => {
	if (query && orderBy === "newest") {
		orderBy = "relevance";
	}
	const BASE_URL = import.meta.env.VITE_THEGUARDIAN_URL;
	const API_KEY = import.meta.env.VITE_THEGUARDIAN_API_KEY;
	const params: Record<string, string> = {
		"api-key": API_KEY,
		"show-fields": "body,byline,thumbnail",
		page: page,
		"page-size": resultsPerPage.toString(),
		"order-by": orderBy,
		"order-date": orderDate,
		...(query && { q: query }),
	};
	const searchParams = new URLSearchParams(params);
	const url = BASE_URL + "search?" + searchParams;
	const res = await fetch(url);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data);
	}
	return {
		articles: theGuardianDTO(data.response.results),
		pagination: {
			currentPage: data.response.currentPage,
			pageSize: data.response.pageSize,
			totalPages: data.response.pages,
			totalResults: data.response.total,
		},
		orderBy: data.response.orderBy,
	};
};
export default apiTheGuardian;
