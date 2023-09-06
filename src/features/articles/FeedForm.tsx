import { categories } from "../../utils/helpers.ts";
import React from "react";

const Input = ({ name }) => {
	return (
		<div className="flex flex-row items-center justify-between gap-2">
			<label htmlFor={name} className="capitalize text-zinc-500">
				your name
			</label>
			<input
				type="text"
				id={name}
				name={name}
				placeholder={`type your ${name}`}
				className="h-[35px] rounded border border-teal-300 px-2 focus:border-2 focus:border-teal-500 focus:outline-none"
			/>
		</div>
	);
};

const CheckBox = ({ name }) => {
	return (
		<div className="flex flex-row items-center justify-between gap-2">
			<label htmlFor={name}>{name}</label>
			<input type="checkbox" id={name} name={name} className="border-teal-300 bg-teal-100 text-teal-500 focus:ring-teal-200" />
		</div>
	);
};
const FeedForm = () => {
	// const [userPreferences, setUserPreferences] = useState({});

	const handler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		console.log("data", data);
		const formObject = Object.fromEntries(data.entries());
		localStorage.setItem("userPreferences", JSON.stringify(formObject));
	};

	return (
		<div className="px-8">
			<h1 className="pb-10 text-lg font-medium text-teal-600">my feed preferences</h1>
			<form onSubmit={handler}>
				<Input name="name" />
				<p className="my-5 text-center uppercase text-zinc-500">Select your interests</p>
				{categories.map((category) => (
					<CheckBox name={category} key={category} />
				))}
				<div className="mt-5 text-right">
					<button className="rounded border border-teal-500 px-5 py-2 font-medium leading-none text-teal-500">Save</button>
				</div>
			</form>
		</div>
	);
};
export default FeedForm;
