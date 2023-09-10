import { Article } from "../interfaces/Article.ts";
import ArticleType, { Byline } from "../types/Article.ts";

const newYorkTimesDTO = (articles: ArticleType[]) => {
	const NEW_YORK_TIMES_BASE_URL = "https://www.nytimes.com/";
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		let imageURL: string;
		if (article?.multimedia?.length) {
			imageURL =
				NEW_YORK_TIMES_BASE_URL +
				article.multimedia
					.filter((multimedia) => multimedia.type === "image")
					.filter((art) => art.width < 400)
					.sort((a, b) => b.width - a.width)[0].url;
		} else {
			imageURL = "";
		}
		return new Article({
			id: article._id,
			title: article.headline.main,
			abstract: article.abstract,
			date: article.pub_date,
			url: article.web_url,
			author: (article.byline as Byline).original,
			source: article?.source as string,
			image: imageURL,
		});
	});
};

export default newYorkTimesDTO;
