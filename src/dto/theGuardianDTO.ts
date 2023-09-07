import { Article } from "../interfaces/Article.ts";
import ArticleType from "../types/Article.ts";

const theGuardianDTO = (articles: ArticleType[]) => {
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		const curTimeStamp = Date.now();
		const timestamp = new Date(article.webPublicationDate).getTime();
		const id = curTimeStamp + timestamp;
		return new Article(
			id.toString(),
			article.webTitle,
			article.fields.body.replace(/<\/?[^>]+(>|$)/g, ""),
			article.webPublicationDate,
			article.webUrl,
			article.fields.byline,
			"theguardian.com",
			article.fields.thumbnail,
		);
	});
};

export default theGuardianDTO;
