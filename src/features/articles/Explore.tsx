import { useLoaderData, useLocation, LoaderFunction } from "react-router-dom";
import apiNewsAPI from "../../services/articles/apiNewsAPI.ts";
import ArticlesList from "./ArticlesList.tsx";
import ArticlesResType from "../../types/ArticlesRes.ts";
import NotFoundPage from "../../ui/NotFoundPage.tsx";

const Explore = () => {
	const location = useLocation();
	const articlesData = useLoaderData() as ArticlesResType;
	const pageHeader = location.pathname.split("/").at(-1);

	if (articlesData.articles.length === 0) {
		return <NotFoundPage />;
	}

	return (
		<div>
			<h1 className="my-10 text-center text-2xl font-bold text-teal-500">{pageHeader} articles</h1>
			<ArticlesList articles={articlesData.articles} small />
		</div>
	);
};

export const loader: LoaderFunction = async ({ params }): Promise<ArticlesResType> => {
	const paramsObject = {
		category: params.category,
	};
	return await apiNewsAPI(paramsObject);
};
export default Explore;
