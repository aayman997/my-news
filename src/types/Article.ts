export type ImageMetadata = {
	url: string;
	format: string;
	height: number;
	width: number;
};

type MediaType = {
	type: "image";
	subtype: "photo";
	caption: string;
	copyright: string;
	approved_for_syndication: number;
	"media-metadata": ImageMetadata[];
};
export default interface ArticleType {
	id: number;
	title: string;
	abstract: string;
	published_date: string;
	url: string;
	source: string;
	media?: MediaType[];
	byline: string;

	author: string;
	date: string;
	image: string;
}
