import { useState } from "react";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";
import Loader from "../../ui/Loader.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

interface CreateUserType {
	username: string;
	email: string;
	password: string;
}

const Register = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
	const [loginError, setLoginError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CreateUserType>();
	const onsubmit: SubmitHandler<CreateUserType> = ({ username, email, password }) => {
		setIsLoading(true);
		setLoginError(false);
		login({ username, email, password })
			.then((res) => {
				if (res.code === 201) {
					navigate("/");
				}
			})
			.catch(() => setLoginError(true))
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="flex h-full items-center justify-center">
			{isLoading && <Loader />}
			<div className="basis-[320px] bg-white px-4 py-8 shadow-2xl">
				<h1 className="mb-8 text-center text-xl font-bold text-teal-500">create account now!</h1>
				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onsubmit)}>
					<div className="flex flex-col items-start justify-between gap-2">
						<label htmlFor="username" className="capitalize text-zinc-500">
							username
						</label>
						<input
							type="text"
							id="username"
							placeholder="your username"
							className="h-[35px] w-full rounded border border-teal-300 px-2 focus:border-2 focus:border-teal-500 focus:outline-none"
							{...register("username", {
								required: "username can't be empty",
							})}
						/>
						{errors?.username?.message && <span className="text-xs text-red-500">{errors?.username?.message}</span>}
					</div>
					<div className="flex flex-col items-start justify-between gap-2">
						<label htmlFor="name" className="capitalize text-zinc-500">
							email
						</label>
						<input
							autoComplete="email"
							type="text"
							id="email"
							placeholder="your email address"
							className="h-[35px] w-full rounded border border-teal-300 px-2 focus:border-2 focus:border-teal-500 focus:outline-none"
							{...register("email", {
								required: "email address can't be empty",
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "Please provide a valid email address",
								},
							})}
						/>
						{errors?.email?.message && <span className="text-xs text-red-500">{errors?.email?.message}</span>}
					</div>
					<div className="flex flex-col items-start justify-between gap-2">
						<label htmlFor="name" className="capitalize text-zinc-500">
							password
						</label>
						<div className="relative w-full">
							<input
								type={passwordHidden ? "password" : "text"}
								id="password"
								placeholder="use strong password"
								className="h-[35px] w-full rounded border border-teal-300 px-2 focus:border-2 focus:border-teal-500 focus:outline-none"
								{...register("password", {
									required: "password can't be empty",
									minLength: {
										value: 6,
										message: "Password need a minimum of 6 characters",
									},
								})}
							/>
							<button
								className="absolute bottom-0 right-0 top-0 flex aspect-square items-center justify-center rounded-r bg-transparent text-center text-xl text-teal-500 transition-all duration-300 hover:bg-teal-500 hover:text-white"
								type="button"
								onClick={() => setPasswordHidden((cur) => !cur)}
							>
								{passwordHidden ? <HiEye /> : <HiEyeOff />}
							</button>
						</div>
						{errors?.password?.message && <span className="text-xs text-red-500">{errors?.password?.message}</span>}
						{loginError && (
							<>
								<span className="text-xs text-red-500">email or password is wrong</span>
								<span className="text-xs text-teal-500">
									hint: use password <span className="ml-2 inline-block rounded bg-teal-400 p-1 text-white shadow-md">123456</span>
								</span>
							</>
						)}
					</div>
					<button className="rounded bg-teal-500 px-5 py-2 text-sm font-medium capitalize text-white transition-all duration-300 hover:bg-teal-700">
						register
					</button>
				</form>
			</div>
		</div>
	);
};
export default Register;
