export class Article {
	id: number;
	title: string;
	abstract: string;
	date: string;
	image: string;
	url: string;
	author: string;
	source: string;

	constructor(
		id: number,
		title: string,
		abstract: string,
		date: string,
		url: string,
		author: string,
		source: string,
		image: string = "https://placehold.co/600x400",
	) {
		this.id = id;
		this.title = title;
		this.abstract = abstract;
		this.date = date;
		this.url = url;
		this.author = author;
		this.source = source;
		this.image = image;
	}
}
