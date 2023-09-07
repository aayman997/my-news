export const dateFormatter = (date: string) => {
	const userLocale = navigator.language;
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: "medium",
	};
	return new Intl.DateTimeFormat(userLocale, options).format(new Date(date));
};
export const categories = ["business", "entertainment", "technology", "health", "sports"];
export const sources = ["News API", "The Guardian", "New York Times"];
export const authors = ["the-verge", "google-news", "business-insider", "bbc-news", "ars-technica"];
