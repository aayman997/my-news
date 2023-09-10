import { authors, categories, sources } from "../../utils/helpers.ts";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";

interface FeedFormProps {
	onCloseModal?: () => void;
	setUpdateLocalStg: Dispatch<SetStateAction<boolean>>;
}

type FormError = Record<string, string>;
const FeedForm = ({ onCloseModal, setUpdateLocalStg }: FeedFormProps) => {
	const { user } = useAuth();
	const [error, setError] = useState<FormError>({});
	const [showAuthors, setShowAuthors] = useState(false);
	const [userPreferences] = useState(() => {
		const data = localStorage.getItem("userPreferences");
		return data ? JSON.parse(data) : {};
	});

	useEffect(() => {
		if (userPreferences?.data?.source === "News API") {
			setShowAuthors(true);
		}
	}, [userPreferences?.data?.source]);

	const handler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		data.set("name", user?.user?.username);
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
		<div className="w-[400px] px-8">
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
						value={user?.user?.username}
						disabled
						className="h-[35px] w-full rounded border border-teal-300 px-2 focus:border-2 focus:border-teal-500 focus:outline-none disabled:cursor-not-allowed disabled:select-none disabled:border-none disabled:bg-gray-100"
					/>
					{error?.username && <span className="text-xs text-red-500">{error?.username}</span>}
				</div>
				<div className="flex items-center justify-between gap-3">
					<label className="text-center uppercase text-zinc-500" htmlFor="source">
						preferred source
					</label>
					<select
						name="source"
						id="sources"
						className="h-[35px] w-[160px] rounded border border-teal-300 px-2 leading-none focus:border-2 focus:border-teal-500 focus:outline-none"
						defaultValue={userPreferences?.data?.source}
						onChange={(e) => (e.target.value === "News API" ? setShowAuthors(() => true) : setShowAuthors(() => false))}
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
								defaultChecked={Boolean(userPreferences?.data?.categories?.find?.((stgCategory: string) => stgCategory === category))}
								type="checkbox"
								id={category}
								name="categories"
								value={category}
								className="border-teal-300 bg-teal-100 text-teal-500 focus:ring-teal-200"
							/>
						</div>
					))}
				</div>
				{(userPreferences?.data?.source === "News API" || showAuthors) && (
					<div>
						<p className="mb-2 text-center uppercase text-zinc-500">preferred authors</p>
						{authors.map((author) => (
							<div key={author} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={author}>{author}</label>
								<input
									defaultChecked={
										!userPreferences?.data?.authors?.length
											? true
											: Boolean(userPreferences?.data?.authors?.find?.((stgAuthor: string) => stgAuthor === author))
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
