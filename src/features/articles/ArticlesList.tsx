import Article from "./Article.tsx";
import ArticleType from "../../types/Article.ts";
import PaginationType from "../../types/Pagination.ts";
import Pagination from "../../ui/Pagination.tsx";

interface ArticlesListProps {
	articles: Partial<ArticleType>[];
	small?: boolean;
	pagination?: PaginationType;
	withPagination?: boolean;
	aside?: boolean;
}

const ArticlesList = ({ articles, pagination, small = false, withPagination = true, aside = false }: ArticlesListProps) => {
	return (
		<>
			<div className={`flex flex-wrap items-center gap-[30px] md:items-start ${small ? "flex-row flex-wrap" : "flex-col"}`}>
				{articles?.length === 0 && <p>No articles for your current search/feed</p>}
				{articles?.length > 0 && articles?.map((article) => <Article key={article.title} article={article} small={small} aside={aside} />)}
			</div>
			{withPagination && pagination && pagination?.totalPages > 1 && (
				<div className="mt-8 flex items-center justify-center">
					<Pagination pagination={pagination} />
				</div>
			)}
		</>
	);
};
export default ArticlesList;
