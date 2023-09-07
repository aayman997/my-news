export type ImageMetadata = {
	url: string;
	format: string;
	height: number;
	width: number;
};
type MediaType = {
	rank: number;
	subtype: string;
	caption: string | null;
	credit: string | null;
	type: string;
	url: string;
	height: number;
	width: number;
	legacy: Record<string, string>;
	subType: string;
	crop_name: string;
};

type MostViewedMediaType = {
	type: "image";
	subtype: "photo";
	caption: string;
	copyright: string;
	approved_for_syndication: number;
	"media-metadata": ImageMetadata[];
};

export type Byline = {
	original: string;
};
export default interface ArticleType {
	id: number | string;
	title: string;
	abstract: string;
	url: string;
	source: string | { name: string; id?: string | null };
	author: string;
	multimedia: MediaType[];
	byline: string | Byline;
	published_date: string;
	description: string;
	publishedAt: string;
	urlToImage: string;
	media?: MostViewedMediaType[];
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	fields: {
		body: string;
		byline: string;
		thumbnail: string;
	};

	_id: string;
	headline: {
		main: string;
	};
	pub_date: string;
	web_url: string;
	date: string;
	image: string;
}
