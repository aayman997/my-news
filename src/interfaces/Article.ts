import ArticleType from "../types/Article.ts";

export class Article implements Partial<ArticleType> {
	id: ArticleType["id"];
	title: ArticleType["title"];
	abstract: ArticleType["abstract"];
	date: ArticleType["date"];
	image: ArticleType["image"];
	url: ArticleType["url"];
	author: ArticleType["author"];
	source: ArticleType["source"];

	constructor(article: Article) {
		this.id = article.id;
		this.title = article.title;
		this.abstract = article.abstract;
		this.date = article.date;
		this.url = article.url;
		this.author = article.author;
		this.source = article.source;
		this.image = article.image || "https://placehold.co/600x400";
	}
}
