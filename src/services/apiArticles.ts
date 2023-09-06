import newYorkTimeToArticle from "../dto/newYorkTime.ts";

const getMostViewedArticles = async () => {
	const res = await fetch(`${import.meta.env.VITE_NYTIMES_URL}viewed/1.json?api-key=${import.meta.env.VITE_NYTIMES_API_KEY}`);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data);
	}
	return {
		...data,
		results: newYorkTimeToArticle(data.results.slice(0, 5)),
	};
};
export default getMostViewedArticles;
