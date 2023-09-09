import { dateFormatter } from "../../utils/helpers.ts";
import ArticleType from "../../types/Article.ts";

interface ArticleProps {
	article: Partial<ArticleType>;
	small?: boolean;
}

const Article = ({ article, small }: ArticleProps) => {
	const { id, title, abstract, author, date, image, source } = article;
	return (
		<article
			className={`border-gray-200-100 flex flex-nowrap gap-5 overflow-hidden rounded-md border bg-stone-100 shadow-sm transition-all duration-300 hover:shadow-xl 
			${small ? "max-w-[360px] shrink-0 grow basis-[330px] flex-col" : "flex-row"}`}
			id={`article${id}`}
		>
			<div className="aspect-video h-[170px] shrink-0 grow-0">
				<img src={image} alt="" className="h-full w-full object-cover" />
			</div>
			<div className={`grow-1 flex w-full flex-col gap-2 ${small ? "px-3 pb-3" : "p-3 pl-0"}`}>
				<h2 className="font-medium">{title}</h2>
				<p className="line-clamp-3 text-sm text-zinc-600">{abstract}</p>
				<div className="mt-auto flex flex-nowrap items-center justify-between text-zinc-500">
					<p className="text-xs">
						{author} - {dateFormatter(date)}
					</p>
					{typeof source === "string" && <p>{source}</p>}
				</div>
			</div>
		</article>
	);
};
export default Article;
