import { authors as authorsList, categories as categoryList } from "../utils/helpers.ts";
import React, { useState, Dispatch, SetStateAction } from "react";

type FormError = Record<string, string | undefined>;

interface SearchFilterProps {
	setCategories: Dispatch<SetStateAction<string[]>>;
	setAuthors: Dispatch<SetStateAction<string[]>>;
	setStartDate: Dispatch<SetStateAction<string>>;
	setEndDate: Dispatch<SetStateAction<string>>;
	endDate: string;
	startDate: string;
	categories: string[];
	authors: string[];
}

const SearchFilter = ({ setCategories, setAuthors, setStartDate, setEndDate, endDate, startDate, categories, authors }: SearchFilterProps) => {
	const [formError, setFormError] = useState<FormError>({});

	const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormError(() => ({}));
		const selectedDate = new Date(e.target.value).toISOString();
		const now = new Date().toISOString();
		if (selectedDate > now) {
			return setFormError((cur) => ({ ...cur, startDate: "start date cannot be in the future" }));
		}
		if (endDate && endDate < selectedDate) {
			return setFormError((cur) => ({ ...cur, startDate: "start date cannot be after end date" }));
		}
		setStartDate(selectedDate);
	};

	const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormError(() => ({}));
		const selectedDate = new Date(e.target.value);
		const now = new Date().toISOString();
		if (selectedDate.toISOString() > now) {
			return setFormError((cur) => ({ ...cur, endDate: "end date cannot be in the future" }));
		}
		if (startDate && startDate > selectedDate.toISOString()) {
			return setFormError((cur) => ({ ...cur, endDate: "end date cannot be before start date" }));
		}
		// End of the selected date
		const modifiedDate = new Date(selectedDate.setHours(23, 59, 59, 999));
		setEndDate(modifiedDate.toISOString());
	};

	return (
		<>
			<h3 className="mb-5 text-lg font-bold text-teal-500">Search Filter</h3>
			<div className="flex flex-col gap-8">
				<div>
					<p className="relative mb-2 flex items-center justify-between uppercase text-zinc-500 after:absolute after:left-0 after:top-[50%] after:z-[0] after:h-[1px] after:w-full after:bg-teal-500 after:content-['']">
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium text-gray-900">authors</span>
						<button
							className="relative z-[1] rounded bg-red-200 px-2 py-1 text-sm font-bold text-red-900 transition-all duration-300 hover:bg-red-500 hover:text-white"
							onClick={() => setAuthors(() => [])}
						>
							clear authors
						</button>
					</p>
					<div className="flex flex-col gap-4">
						{authorsList.map((author) => (
							<div key={author} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={author}>{author}</label>
								<input
									defaultChecked={Boolean(authors.find((stgAuthor: string) => stgAuthor === author))}
									type="checkbox"
									id={author}
									name="authors"
									value={author}
									className="border-teal-300 bg-teal-100 text-teal-500 focus:ring-teal-200 disabled:bg-teal-50 hover:disabled:bg-teal-50"
									onChange={() => {
										setAuthors((prev) => {
											const updated = [...prev];
											const index = updated.indexOf(author);
											if (index >= 0) {
												updated.splice(index, 1);
											} else {
												updated.push(author);
											}
											return updated;
										});
									}}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<p className="relative mb-2 flex items-center justify-between uppercase text-zinc-500 after:absolute after:left-0 after:top-[50%] after:z-[0] after:h-[1px] after:w-full after:bg-teal-500 after:content-['']">
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium text-gray-900">Categories</span>
						<button
							className="relative z-[1] rounded bg-red-200 px-2 py-1 text-sm font-bold text-red-900 transition-all duration-300 hover:bg-red-500 hover:text-white"
							onClick={() => setCategories(() => [])}
						>
							clear Categories
						</button>
					</p>
					<div className="flex flex-col gap-4">
						{categoryList.map((category) => (
							<div key={category} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={category}>{category}</label>
								<input
									defaultChecked={Boolean(categories.find((stgCategory: string) => stgCategory === category))}
									type="checkbox"
									id={category}
									name="category"
									value={category}
									className="border-teal-300 bg-teal-100 text-teal-500 focus:ring-teal-200 disabled:bg-teal-50 hover:disabled:bg-teal-50"
									onChange={() => {
										setCategories((prev) => {
											const updated = [...prev];
											const index = updated.indexOf(category);
											if (index >= 0) {
												updated.splice(index, 1);
											} else {
												updated.push(category);
											}
											return updated;
										});
									}}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<p className="relative mb-2 uppercase text-zinc-500 after:absolute after:left-0 after:top-[50%] after:z-[0] after:h-[1px] after:w-full after:bg-teal-500 after:content-['']">
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium text-gray-900">date</span>
					</p>
					<div className="flex gap-4">
						<div className="basis-1/2">
							<label className="mb-2 inline-block text-sm font-medium" htmlFor="startDate">
								start date
							</label>
							<input
								type="date"
								name="start-date"
								id="startDate"
								className="w-full rounded border-none bg-teal-50 shadow-md"
								onChange={(e) => handleStartDate(e)}
								defaultValue={startDate ? new Date(startDate).toISOString().split("T")[0] : undefined}
							/>
							{formError?.startDate && <span className="text-xs text-red-500">{formError?.startDate}</span>}
						</div>
						<div className="basis-1/2">
							<label className="mb-2 inline-block text-sm font-medium" htmlFor="endDate">
								end date
							</label>
							<input
								type="date"
								name="end-date"
								id="endDate"
								className="w-full rounded border-none bg-teal-50 shadow-md"
								onChange={(e) => handleEndDate(e)}
								defaultValue={endDate ? new Date(endDate).toISOString().split("T")[0] : undefined}
							/>
							{formError?.endDate && <span className="text-xs text-red-500">{formError?.endDate}</span>}
						</div>
					</div>
					{(Boolean(startDate) || Boolean(endDate)) && (
						<div className="mt-3 text-right">
							<button className="rounded bg-teal-500 px-5 py-2 text-sm font-medium capitalize text-white transition-all duration-300 hover:bg-teal-700">
								apply
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default SearchFilter;
