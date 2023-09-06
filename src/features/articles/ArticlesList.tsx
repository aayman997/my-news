import Article from "./Article.tsx";
import ArticleType from "../../types/Article.ts";

interface ArticlesListProps {
	articles: ArticleType[];
	small?: boolean;
}

const ArticlesList = ({ articles, small = false }: ArticlesListProps) => {
	return (
		<div className="flex flex-col flex-wrap gap-[30px]">
			{articles.map((article) => (
				<Article key={article.title} article={article} small={small} />
			))}
		</div>
	);
};
export default ArticlesList;
