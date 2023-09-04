import { useMostViewedArticles } from "../features/articles/useMostViewedArticles.ts";
import ArticlesList from "../features/articles/ArticlesList.tsx";
import Loader from "./Loader.tsx";

const Home = () => {
	const { articles, error, isLoading } = useMostViewedArticles();
	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <p>Erro happened while loading data 🥲</p>;
	}
	return (
		<div className="my-10 flex flex-nowrap gap-5">
			<div className="basis-2/3">
				<h1 className="mb-4 text-3xl font-bold capitalize text-teal-500">my feed</h1>
				<ArticlesList articles={articles?.results} />
			</div>
			<div className="basis-1/3">
				<h3 className="mb-4 text-xl font-bold capitalize text-teal-500">most viewed articles</h3>
				<ArticlesList articles={articles?.results} />
			</div>
		</div>
	);
};
export default Home;
