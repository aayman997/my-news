import { useQuery } from "@tanstack/react-query";
import getMostViewedArticles from "../../services/apiArticles.ts";

export const useMostViewedArticles = () => {
	const {
		isLoading,
		data: articles,
		error,
	} = useQuery({
		queryKey: ["mostViewedArticles"],
		queryFn: getMostViewedArticles,
		retry: false,
	});

	return { isLoading, error, articles };
};
