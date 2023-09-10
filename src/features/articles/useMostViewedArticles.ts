import { useQuery } from "@tanstack/react-query";
import getMostViewedArticles from "../../services/articles/apiNewYorkTimes.ts";

export const useMostViewedArticles = () => {
	const {
		isLoading,
		data: articles,
		error,
	} = useQuery({
		queryKey: ["mostViewedArticles"],
		queryFn: () => getMostViewedArticles(true),
		retry: false,
	});

	return { isLoading, error, articles };
};
