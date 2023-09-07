import { Article } from "../interfaces/Article.ts";
import ArticleType from "../types/Article.ts";

const newsAPIDTO = (articles: ArticleType[]) => {
	if (!articles.length) {
		return [];
	}
	return articles
		.filter((article) => article.title !== "[Removed]")
		.map((article) => {
			const curTimeStamp = Date.now();
			const timestamp = new Date(article.publishedAt).getTime();
			const id = curTimeStamp + timestamp;
			return new Article(
				id.toString(),
				article.title,
				article.description,
				article.publishedAt,
				article.url,
				article.author,
				typeof article.source === "object" ? article.source.name : article.source,
				article.urlToImage,
			);
		});
};

export default newsAPIDTO;
