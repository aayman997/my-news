// const breakpoints = [400, 600, 800];

import { dateFormatter } from "../../utils/helpers.ts";

type MediaObj = {
	url: string;
	height: number;
	width: number;
};

interface ArticleProps {
	article: {
		id: number;
		title: string;
		abstract: string;
		byline: string;
		adx_keywords: string;
		published_date: string;
		source: string;
		media: {
			"media-metadata": MediaObj[];
		}[];
	};
}

const Article = ({ article }: ArticleProps) => {
	let mediaObj: MediaObj = {} as MediaObj;
	const { id, title, abstract, byline, adx_keywords, published_date, source, media } = article;
	const keywords: string[] = adx_keywords.split(";").slice(0, 5);
	if (media.length === 0) {
		mediaObj.url = "https://placehold.co/600x400";
	} else {
		mediaObj = media?.[0]?.["media-metadata"]?.sort((a, b) => b.width - a.width)[0];
	}
	return (
		<article
			className="border-gray-200-100 flex flex-nowrap gap-5 overflow-hidden rounded-md border bg-stone-100 shadow-sm transition-all duration-300 hover:shadow-xl"
			id={`article${id}`}
		>
			<div className="shrink-0 grow-0 basis-64" style={{ background: `url(${mediaObj.url}) no-repeat center/cover` }} />
			<div className="grow-1 flex flex-col gap-2 p-3 pl-0">
				<h2 className="font-medium">{title}</h2>
				<p className="text-sm text-zinc-600">{abstract}</p>
				<p className="flex flex-wrap gap-2">
					{keywords.map((keyword) => (
						<span key={keyword} className="rounded-full bg-teal-600 px-2 py-1 text-xs text-teal-50">
							{keyword}
						</span>
					))}
				</p>
				<div className="flex flex-nowrap items-center justify-between text-zinc-500">
					<p className="text-xs">
						{byline} - {dateFormatter(published_date)}
					</p>
					<p>{source}</p>
				</div>
			</div>
		</article>
	);
};
export default Article;
