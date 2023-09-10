export const dateFormatter = (date?: string) => {
	if (!date) {
		return;
	}
	const userLocale = navigator.language;
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: "medium",
	};
	return new Intl.DateTimeFormat(userLocale, options).format(new Date(date));
};
export const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
export const sources = ["News API", "The Guardian", "New York Times"];
export const authors = ["the-verge", "google-news", "business-insider", "bbc-news", "ars-technica"];

export const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
