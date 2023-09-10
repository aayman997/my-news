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
		return new Article({
			id: id.toString(),
			title: article.webTitle,
			abstract: article.fields.body.replace(/<\/?[^>]+(>|$)/g, ""),
			date: article.webPublicationDate,
			url: article.webUrl,
			author: article.fields.byline,
			source: "theguardian.com",
			image: article.fields.thumbnail,
		});
	});
};

export default theGuardianDTO;
