export class Article {
	id: string;
	title: string;
	abstract: string;
	date: string;
	image: string;
	url: string;
	author: string;
	source: string;

	constructor(id: string, title: string, abstract: string, date: string, url: string, author: string, source: string, image?: undefined | string) {
		this.id = id;
		this.title = title;
		this.abstract = abstract;
		this.date = date;
		this.url = url;
		this.author = author;
		this.source = source;
		if (image) {
			this.image = image;
		} else {
			this.image = "https://placehold.co/600x400";
		}
	}
}
