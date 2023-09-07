import { Article } from "../interfaces/Article.ts";
import ArticleType from "../types/Article.ts";

const newYorkTimeToArticleDTO = (articles: ArticleType[]) => {
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		let imageURL: string | undefined;
		if (article?.media?.length) {
			imageURL = [...article.media[0]["media-metadata"]].sort((a, b) => b.width - a.width)[0].url;
		} else {
			imageURL = undefined;
		}
		return new Article(
			article.id.toString(),
			article.title,
			article.abstract,
			article.published_date,
			article.url,
			article.byline as string,
			article.source as string,
			imageURL,
		);
	});
};

export default newYorkTimeToArticleDTO;
