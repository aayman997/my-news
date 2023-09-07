import newYorkTimesDTO from "../dto/newYorkTimesDTO.ts";
import newYorkTimesMostViewedDTO from "../dto/newYorkTimesMostViewedDTO.ts";

const apiNewYorkTimes = async (
	mostViewed: boolean = false,
	query?: string,
	page: string = "1",
	sort: string = "newest",
	beginDate?: string,
	endDate?: string,
) => {
	let url;
	const PAGE_SIZE = 10;
	const BASE_URL = import.meta.env.VITE_NYTIMES_URL;
	const API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;
	const params: Record<string, string> = {
		"api-key": API_KEY,
		page: (+page - 1).toString(),
		sort,
		...(beginDate && { begin_date: beginDate }),
		...(endDate && { end_date: endDate }),
		...(query && { q: query }),
	};
	const searchParams = new URLSearchParams(params);
	if (mostViewed) {
		url = BASE_URL + "/svc/mostpopular/v2/viewed/7.json?api-key=" + API_KEY;
	} else {
		url = BASE_URL + "svc/search/v2/articlesearch.json?" + searchParams;
	}
	const res = await fetch(url);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(JSON.stringify(data));
	}
	if (mostViewed) {
		return {
			articles: newYorkTimesMostViewedDTO(data.results.slice(0, 5)),
		};
	}
	return {
		articles: newYorkTimesDTO(data.response.docs),
		pagination: {
			currentPage: data.response.meta.offset,
			totalResults: data.response.meta.hits,
			pageSize: PAGE_SIZE,
			totalPages: Math.ceil(data.response.meta.hits / PAGE_SIZE),
		},
	};
};
export default apiNewYorkTimes;