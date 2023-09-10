import { useQuery } from "@tanstack/react-query";
import apiNewsAPI from "../../services/articles/apiNewsAPI.ts";

export const useSearchArticles = (query: Record<string, string>) => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["searchedArticles", query],
		queryFn: () => apiNewsAPI(query),
		retry: false,
	});

	return { isLoading, error, data };
};
