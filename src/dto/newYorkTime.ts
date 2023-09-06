import { Article } from "../interfaces/Article.ts";
import ArticleType, { ImageMetadata } from "../types/Article.ts";

const newYorkTimeToArticle = (articles: ArticleType[]) => {
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		let imageURL: string | undefined;
		if (article?.media?.length) {
			imageURL = [...article.media[0]["media-metadata"]].sort((a: ImageMetadata, b: ImageMetadata) => b.width - a.width)[0].url;
		} else {
			imageURL = undefined;
		}
		return new Article(article.id, article.title, article.abstract, article.published_date, article.url, article.byline, article.source, imageURL);
	});
};

export default newYorkTimeToArticle;
