import { authors, categories, sources } from "../../utils/helpers.ts";
import React, { useState, Dispatch, SetStateAction } from "react";

interface FeedFormProps {
	onCloseModal?: () => void;
	setUpdateLocalStg: Dispatch<SetStateAction<boolean>>;
}

type FormError = Record<string, string>;
const FeedForm = ({ onCloseModal, setUpdateLocalStg }: FeedFormProps) => {
	const [error, setError] = useState<FormError>({});
	const [authorsDisabled, setAuthorsDisabled] = useState(false);
	const [userPreferences] = useState(() => {
		const data = localStorage.getItem("userPreferences");
		return data ? JSON.parse(data) : {};
	});
	const handler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const username = data.get("name");
		if (!username) {
			return setError((prevState) => ({ ...prevState, username: "please enter your name" }));
		}
		const source = data.get("source");
		const categories = data.getAll("categories");
		const authors = data.getAll("authors");
		const formObject = {
			username,
			data: {
				source,
				categories,
				authors,
			},
		};
		localStorage.setItem("userPreferences", JSON.stringify(formObject));
		onCloseModal?.();
		setUpdateLocalStg((cur) => !cur);
	};

	return (
		<div className="px-8">
			<h1 className="pb-10 text-lg font-medium text-teal-600">my feed preferences</h1>
			<form onSubmit={handler} className="flex flex-col gap-6" id="userPreferencesForm">
				<div className="flex flex-col items-start justify-between gap-2">
					<label htmlFor="name" className="capitalize text-zinc-500">
						your name <sup className="font-bold text-red-500">*</sup>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						defaultValue={userPreferences?.username}
						placeholder="type your name"
						className="h-[35px] w-full rounded border border-teal-300 px-2 focus:border-2 focus:border-teal-500 focus:outline-none"
						onChange={(e) =>
							e.target.value
								? setError((prevState) => ({ ...prevState, username: "" }))
								: setError((prevState) => ({ ...prevState, username: "please enter your name" }))
						}
					/>
					{error?.username && <span className="text-xs text-red-500">{error?.username}</span>}
				</div>
				<div className="flex items-center justify-center gap-3">
					<label className="text-center uppercase text-zinc-500" htmlFor="source">
						preferred source
					</label>
					<select
						name="source"
						id="sources"
						className="h-[35px] rounded border border-teal-300 px-2 leading-none focus:border-2 focus:border-teal-500 focus:outline-none"
						defaultValue={userPreferences?.data?.source}
						onChange={(e) => (e.target.value !== "News API" ? setAuthorsDisabled(() => true) : setAuthorsDisabled(() => false))}
					>
						{sources.map((source) => (
							<option value={source} key={source}>
								{source}
							</option>
						))}
					</select>
				</div>
				<div>
					<p className="mb-2 text-center uppercase text-zinc-500">favorite categories</p>
					{categories.map((category) => (
						<div key={category} className="flex flex-row items-center justify-between gap-2">
							<label htmlFor={category}>{category}</label>
							<input
								defaultChecked={Boolean(userPreferences?.data?.categories?.find((stgCategory: string) => stgCategory === category))}
								type="checkbox"
								id={category}
								name="categories"
								value={category}
								className="border-teal-300 bg-teal-100 text-teal-500 focus:ring-teal-200"
							/>
						</div>
					))}
				</div>
				{!authorsDisabled && (
					<div>
						<p className="mb-2 text-center uppercase text-zinc-500">preferred authors</p>
						{authors.map((author) => (
							<div key={author} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={author}>{author}</label>
								<input
									disabled={authorsDisabled}
									defaultChecked={
										!userPreferences?.data?.authors?.length
											? true
											: Boolean(userPreferences?.data?.authors?.find((stgAuthor: string) => stgAuthor === author))
									}
									type="checkbox"
									id={author}
									name="authors"
									value={author}
									className="border-teal-300 bg-teal-100 text-teal-500 focus:ring-teal-200 disabled:bg-teal-50 hover:disabled:bg-teal-50"
								/>
							</div>
						))}
					</div>
				)}
				<div className="text-right">
					<button className="rounded border border-teal-500 px-5 py-2 font-medium leading-none text-teal-500">Save</button>
				</div>
			</form>
		</div>
	);
};
export default FeedForm;
