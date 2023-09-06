import { useQuery } from "@tanstack/react-query";
import apiArticlesByKeyword from "../../services/apiArticlesByKeyword.ts";

export const useSearchArticles = (query: string) => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["searchedArticles", query],
		queryFn: () => apiArticlesByKeyword(query),
		retry: false,
	});

	return { isLoading, error, data };
};
