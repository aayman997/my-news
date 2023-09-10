import { useMostViewedArticles } from "../features/articles/useMostViewedArticles.ts";
import ArticlesList from "../features/articles/ArticlesList.tsx";
import Loader from "../ui/Loader.tsx";
import Modal from "../ui/Modal.tsx";
import FeedForm from "../features/articles/FeedForm.tsx";
import { useEffect, useState } from "react";
import apiTheGuardian from "../services/articles/apiTheGuardian.ts";
import apiNewYorkTimes from "../services/articles/apiNewYorkTimes.ts";
import apiNewsAPI from "../services/articles/apiNewsAPI.ts";
import { useSearchParams, useNavigate } from "react-router-dom";
import ArticleType from "../types/Article.ts";
import PaginationType from "../types/Pagination.ts";
import { useAuth } from "../context/AuthContext.tsx";

interface ArticlesType {
	articles: Partial<ArticleType>[];
	pagination: PaginationType;
}

interface UserPrefType {
	username: string;
	data: {
		source: string;
		authors: string[];
		categories: string[];
	};
}

const Home = () => {
	const { user } = useAuth();
	const { articles: mostViewedArticles, error: errorLoadingMostViewed, isLoading: isLoadingMostViewed } = useMostViewedArticles();
	const [myArticles, setMyArticles] = useState<ArticlesType>({} as ArticlesType);
	const [isLoadingMyFeed, setIsLoadingMyFeed] = useState<boolean>(false);
	const [errorLoadingMyFeed, setErrorLoadingMyFeed] = useState<boolean>(false);
	const [isLocaleStorageUpdated, setIsLocaleStorageUpdated] = useState(false);
	const [mobileScreen] = useState(() => window.innerWidth < 1024);
	const [userPref, setUserPref] = useState<UserPrefType>(() => {
		const data = localStorage.getItem("userPreferences");
		return data ? JSON.parse(data) : ({} as UserPrefType);
	});

	const [params] = useSearchParams();
	const navigate = useNavigate();
	const page = params.get("page") ?? "1";

	useEffect(() => {
		setUserPref(() => {
			const data = localStorage.getItem("userPreferences");
			return data ? JSON.parse(data) : ({} as UserPrefType);
		});
	}, [isLocaleStorageUpdated]);

	useEffect(() => {
		if (Object.entries(userPref)?.length) {
			const query = userPref?.data?.categories.join(",");
			const authors = userPref?.data?.authors.join(",");
			setIsLoadingMyFeed(true);
			setErrorLoadingMyFeed(false);
			if (userPref?.data?.source === "The Guardian") {
				apiTheGuardian(query, page)
					.then((res) => setMyArticles(res))
					.catch(() => setErrorLoadingMyFeed(true))
					.finally(() => setIsLoadingMyFeed(false));
			} else if (userPref?.data?.source === "New York Times") {
				apiNewYorkTimes(false, query, page)
					.then((res) => setMyArticles(res as ArticlesType))
					.catch(() => setErrorLoadingMyFeed(true))
					.finally(() => setIsLoadingMyFeed(false));
			} else {
				const paramsObject = {
					q: query,
					page,
					sources: authors,
				};
				apiNewsAPI(paramsObject)
					.then((res) => setMyArticles(res))
					.catch(() => setErrorLoadingMyFeed(true))
					.finally(() => setIsLoadingMyFeed(false));
			}
		}
	}, [page, userPref]);

	if (isLoadingMostViewed || isLoadingMyFeed) {
		return <Loader />;
	}

	return (
		<div className="my-10 flex flex-wrap gap-8 lg:flex-nowrap lg:gap-6 xl:gap-16">
			<div className="basis-full lg:basis-3/4">
				<div className="mb-5 flex flex-nowrap items-center justify-between">
					<h1 className="mr-auto font-bold capitalize text-teal-500">my feed</h1>
					<Modal>
						<Modal.Open opens="create">
							<button className="rounded bg-teal-400 px-3 py-1 font-medium uppercase text-teal-50 shadow-lg transition-all duration-300 hover:shadow-2xl md:font-bold lg:px-5 lg:py-3">
								feed customization
							</button>
						</Modal.Open>
						<Modal.Window name="create">
							<FeedForm setUpdateLocalStg={setIsLocaleStorageUpdated} />
						</Modal.Window>
					</Modal>
				</div>
				{user?.user?.username && !errorLoadingMyFeed && (
					<>
						<h2 className="mb-4 text-xl font-medium capitalize text-teal-500">👋 Welcome back, {user?.user?.username}</h2>
						<ArticlesList articles={myArticles.articles} pagination={myArticles.pagination} small={false} withPagination={false} />
						{myArticles?.pagination?.totalResults > 10 && (
							<div className="mt-8 text-right">
								<button
									className="rounded bg-teal-500 px-5 py-2 font-medium capitalize text-white transition-all duration-300 hover:bg-teal-700"
									onClick={() => {
										const data = {
											...(userPref.data.authors.length && { authors: userPref.data.authors.join(",") }),
											...(userPref.data.categories.length && { query: userPref.data.categories.join(",") }),
										};
										const params = new URLSearchParams(data);
										navigate(`/search?${params}`);
									}}
								>
									show more articles
								</button>
							</div>
						)}
					</>
				)}
				{!user?.user?.username && !errorLoadingMyFeed && <p>start customizing your feed</p>}
				{errorLoadingMyFeed && <p>Error happened while loading data 🥲</p>}
			</div>
			<aside className="basis-full lg:basis-1/4">
				<h3 className="mb-4 text-xl font-bold capitalize text-teal-500">most viewed articles</h3>
				{!errorLoadingMostViewed && <ArticlesList articles={mostViewedArticles?.articles ?? []} small aside={!mobileScreen} />}
				{Boolean(errorLoadingMostViewed) && <p>Error happened while loading data 🥲</p>}
			</aside>
		</div>
	);
};
export default Home;
