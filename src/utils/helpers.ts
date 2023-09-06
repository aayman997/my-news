export const dateFormatter = (date: string) => {
	const userLocale = navigator.language;
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: "medium",
	};
	return new Intl.DateTimeFormat(userLocale, options).format(new Date(date));
};
export const categories = ["business", "entertainment", "technology", "health", "sports"];
