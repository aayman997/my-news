import Article from "./Article.tsx";
import ArticleType from "../../types/Article.ts";
import PaginationType from "../../types/Pagination.ts";
import Pagination from "../../ui/Pagination.tsx";

interface ArticlesListProps {
	articles: Partial<ArticleType>[];
	small?: boolean;
	pagination?: PaginationType;
}

const ArticlesList = ({ articles, pagination, small = false }: ArticlesListProps) => {
	return (
		<>
			<div className="flex flex-col flex-wrap gap-[30px]">
				{articles.map((article) => (
					<Article key={article.title} article={article} small={small} />
				))}
			</div>
			{pagination && pagination.totalPages > 1 && (
				<div className="mt-8 flex items-center justify-center">
					<Pagination pagination={pagination} />
				</div>
			)}
		</>
	);
};
export default ArticlesList;
