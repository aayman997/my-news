import { useQuery } from "@tanstack/react-query";
import apiNewsAPI from "../../services/apiNewsAPI.ts";

export const useSearchArticles = (query: string) => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["searchedArticles", query],
		queryFn: () => apiNewsAPI(query),
		retry: false,
	});

	return { isLoading, error, data };
};
