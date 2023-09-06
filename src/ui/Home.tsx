import { useMostViewedArticles } from "../features/articles/useMostViewedArticles.ts";
import ArticlesList from "../features/articles/ArticlesList.tsx";
import Loader from "./Loader.tsx";
import Modal from "./Modal.tsx";
import FeedForm from "../features/articles/FeedForm.tsx";
import { useEffect, useState } from "react";
import apiArticlesByKeyword from "../services/apiArticlesByKeyword.ts";

const Home = () => {
	const { articles: mostViewedArticles, error, isLoading } = useMostViewedArticles();
	const [username, setUsername] = useState("");
	const [userPref, setUserPref] = useState({});
	// const [myArticles, setMyArticles] = useState([]);
	useEffect(() => {
		const localeStg = localStorage.getItem("userPreferences");
		if (localeStg) {
			const parsedStorage = JSON.parse(localeStg);
			setUsername(parsedStorage.name);
			setUserPref(parsedStorage.pref);
			apiArticlesByKeyword("health or sport");
		}
	}, []);

	console.log("userPref", userPref);

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <p>Erro happened while loading data 🥲</p>;
	}
	console.log("mostViewedArticles", mostViewedArticles);
	return (
		<div className="my-10 flex flex-nowrap gap-16">
			<div className="basis-3/4">
				<div className="mb-5 flex flex-nowrap items-center justify-between">
					<h1 className="mb-4 text-3xl font-bold capitalize text-teal-500">my feed</h1>
					<Modal>
						<Modal.Open opens="create">
							<button className="rounded bg-teal-400 px-5 py-3 font-bold uppercase text-teal-50 shadow-lg transition-all duration-300 hover:shadow-2xl">
								feed customization
							</button>
						</Modal.Open>
						<Modal.Window name="create">
							<FeedForm />
						</Modal.Window>
					</Modal>
				</div>
				{username ? <ArticlesList articles={mostViewedArticles?.results} small={false} /> : <p>start customizing your feed</p>}
			</div>
			<div className="basis-1/4">
				<h3 className="mb-4 text-xl font-bold capitalize text-teal-500">most viewed articles</h3>
				<ArticlesList articles={mostViewedArticles?.results} small />
			</div>
		</div>
	);
};
export default Home;
