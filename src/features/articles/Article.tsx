import { dateFormatter } from "../../utils/helpers.ts";
import ArticleType from "../../types/Article.ts";

interface ArticleProps {
	article: Partial<ArticleType>;
	small?: boolean;
	aside?: boolean;
}

const Article = ({ article, small, aside }: ArticleProps) => {
	const { title, abstract, author, date, image, source } = article;
	return (
		<article
			className={`border-gray-200-100 flex shrink-0 grow flex-col flex-nowrap gap-5 overflow-hidden rounded-md border bg-stone-100 shadow-sm transition-all duration-300 hover:shadow-xl sm:basis-[300px] md:w-auto md:grow-0 md:basis-auto md:flex-row 
			${
				small
					? "shrink-0 grow basis-1/2 flex-wrap md:max-w-[360px] md:grow md:basis-[47%] lg:max-w-full [&]:flex-col"
					: "flex-col md:w-[100%] md:max-w-[100%] md:flex-row"
			} ${aside ? "lg:basis-full" : "items-stretch md:basis-[calc((100%-30px)/2)] lg:grow lg:basis-[calc(100%/5)]"}`}
		>
			<div className="aspect-video h-[170px] shrink-0 grow-0">
				<img src={image} alt="" className="h-full w-full object-cover" />
			</div>
			<div className={`grow-1 flex w-full flex-col gap-2 ${small ? "px-3 pb-3" : "px-3 pb-3 md:p-3 md:pl-0"}`}>
				<h2 className="line-clamp-2 min-h-[48px] font-medium">{title}</h2>
				<p className="line-clamp-3 h-[60px] text-sm text-zinc-600">{abstract}</p>
				<div className="mt-auto flex flex-wrap items-center justify-between text-zinc-500">
					{author && <p className="text-xs">{author.slice(0, 30)}</p>}
					{date && <p className="text-xs">{dateFormatter(date)}</p>}
					{source && typeof source === "string" && <p className="text-xs">{source}</p>}
				</div>
			</div>
		</article>
	);
};
export default Article;
