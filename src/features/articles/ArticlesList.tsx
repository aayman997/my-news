import Article from "./Article.tsx";

const ArticlesList = ({ articles }) => {
	return (
		<div className="flex flex-col flex-wrap gap-[30px]">
			{articles.map((article) => (
				<Article key={article.title} article={article} />
			))}
		</div>
	);
};
export default ArticlesList;
