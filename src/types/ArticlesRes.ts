import ArticleType from "./Article.ts";
import PaginationType from "./Pagination.ts";

export default interface ArticlesResType {
	articles: Partial<ArticleType>[];
	pagination: PaginationType;
}
