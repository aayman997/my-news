import { useMostViewedArticles } from "../features/articles/useMostViewedArticles.ts";
import ArticlesList from "../features/articles/ArticlesList.tsx";
import Loader from "../ui/Loader.tsx";
import Modal from "../ui/Modal.tsx";
import FeedForm from "../features/articles/FeedForm.tsx";
import { useEffect, useState } from "react";
import apiNewsAPI from "../services/apiNewsAPI.ts";
import ArticleType from "../types/Article.ts";
import apiTheGuardian from "../services/apiTheGuardian.ts";
import apiNewYorkTimes from "../services/apiNewYorkTimes.ts";
import { Article } from "../interfaces/Article.ts";
import { useSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
	const { articles: mostViewedArticles, error: errorLoadingMostViewed, isLoading: isLoadingMostViewed } = useMostViewedArticles();
	const [myArticles, setMyArticles] = useState<ArticleType[] | Article[]>([]);
	const [isLoadingMyFeed, setIsLoadingMyFeed] = useState<boolean>(false);
	const [errorLoadingMyFeed, setErrorLoadingMyFeed] = useState<boolean>(false);
	const [isLocaleStorageUpdated, setIsLocaleStorageUpdated] = useState(false);
	const [userPref, setUserPref] = useState(() => {
		const data = localStorage.getItem("userPreferences");
		return data ? JSON.parse(data) : {};
	});
	const [preferredSource] = useState(() => {
		return userPref.data.source;
	});
	const [authors] = useState(() => {
		return userPref.data.authors.join(",");
	});
	const [query] = useState(() => {
		return userPref.data.categories.join(" OR ");
	});
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const page = params.get("page") || "1";
	console.log("params", page);

	useEffect(() => {
		setUserPref(() => {
			const data = localStorage.getItem("userPreferences");
			return data ? JSON.parse(data) : {};
		});
	}, [isLocaleStorageUpdated]);

	useEffect(() => {
		if (Object.entries(userPref).length) {
			console.log("setQuery", query);
			setIsLoadingMyFeed(true);
			if (preferredSource === "The Guardian") {
				apiTheGuardian(query, page)
					.then((res) => setMyArticles(res.articles))
					.catch(() => setErrorLoadingMyFeed(true))
					.finally(() => setIsLoadingMyFeed(false));
			} else if (preferredSource === "New York Times") {
				apiNewYorkTimes(false, query, page)
					.then((res) => setMyArticles(res.articles))
					.catch(() => setErrorLoadingMyFeed(true))
					.finally(() => setIsLoadingMyFeed(false));
			} else {
				apiNewsAPI(query, page, undefined, authors)
					.then((res) => setMyArticles(res.articles))
					.catch(() => setErrorLoadingMyFeed(true))
					.finally(() => setIsLoadingMyFeed(false));
			}
		}
	}, [authors, page, preferredSource, query, userPref]);

	if (isLoadingMostViewed || isLoadingMyFeed) {
		return <Loader />;
	}

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
							<FeedForm setUpdateLocalStg={setIsLocaleStorageUpdated} />
						</Modal.Window>
					</Modal>
				</div>
				{userPref.username && !errorLoadingMyFeed && (
					<>
						<h2 className="mb-4 text-xl font-medium capitalize text-teal-500">👋 Welcome back, {userPref.username}</h2>
						<ArticlesList articles={myArticles} small={false} />
						<div className="my-8 text-right">
							<button
								className="rounded bg-teal-500 px-5 py-2 font-medium capitalize text-white transition-all duration-300 hover:bg-teal-700"
								onClick={() => {
									const data = {
										...(preferredSource && { preferredSource }),
										...(authors && { authors }),
										...(query && { query }),
									};
									const params = new URLSearchParams(data);
									navigate(`/search?${params}`);
								}}
							>
								show more articles
							</button>
						</div>
					</>
				)}
				{!userPref.username && !errorLoadingMyFeed && <p>start customizing your feed</p>}
				{errorLoadingMyFeed && <p>Erro happened while loading data 🥲</p>}
			</div>
			<aside className="basis-1/4">
				<h3 className="mb-4 text-xl font-bold capitalize text-teal-500">most viewed articles</h3>
				{!errorLoadingMostViewed && <ArticlesList articles={mostViewedArticles?.articles} small />}
				{Boolean(errorLoadingMostViewed) && <p>Erro happened while loading data 🥲</p>}
			</aside>
		</div>
	);
};
export default Home;
