import { Article } from "../interfaces/Article.ts";
import ArticleType from "../types/Article.ts";

const newYorkTimeToArticleDTO = (articles: ArticleType[]) => {
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		let imageURL: string;
		if (article?.media?.length) {
			imageURL = [...article.media[0]["media-metadata"]].sort((a, b) => b.width - a.width)[0].url;
		} else {
			imageURL = "";
		}
		return new Article({
			id: article.id.toString(),
			title: article.title,
			abstract: article.abstract,
			date: article.published_date,
			url: article.url,
			author: article.byline as string,
			source: article.source as string,
			image: imageURL,
		});
	});
};

export default newYorkTimeToArticleDTO;
