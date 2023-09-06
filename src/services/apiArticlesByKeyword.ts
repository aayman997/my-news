const apiArticlesByKeyword = async (query: string) => {
	const res = await fetch(`${import.meta.env.VITE_NEWSAPI_URL}everything?q=${query}&apiKey=${import.meta.env.VITE_NEWSAPI_API_KEY}`);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data);
	}
	return data;
};
export default apiArticlesByKeyword;
