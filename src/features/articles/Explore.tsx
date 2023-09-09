import { useLoaderData, useLocation } from "react-router-dom";
import apiNewsAPI from "../../services/apiNewsAPI.ts";
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

interface LoaderParamsType {
	params: {
		category: string;
	};
}

export const loader = async ({ params }: LoaderParamsType): Promise<ArticlesResType> => {
	return await apiNewsAPI(undefined, undefined, undefined, undefined, undefined, undefined, params.category);
};
export default Explore;
