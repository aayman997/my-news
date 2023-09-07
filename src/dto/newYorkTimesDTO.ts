import { Article } from "../interfaces/Article.ts";
import ArticleType, { Byline } from "../types/Article.ts";

const newYorkTimesDTO = (articles: ArticleType[]) => {
	const NEW_YORK_TIMES_BASE_URL = "https://www.nytimes.com/";
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		let imageURL: string | undefined;
		if (article?.multimedia?.length) {
			imageURL =
				NEW_YORK_TIMES_BASE_URL +
				article.multimedia
					.filter((multimedia) => multimedia.type === "image")
					.filter((art) => art.width < 400)
					.sort((a, b) => b.width - a.width)[0].url;
		} else {
			imageURL = undefined;
		}
		return new Article(
			article._id,
			article.headline.main,
			article.abstract,
			article.pub_date,
			article.web_url,
			(article.byline as Byline).original,
			article.source as string,
			imageURL,
		);
	});
};

export default newYorkTimesDTO;
