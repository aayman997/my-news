interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
	return (
		<>
			<div className="flex h-[100dvh] items-center justify-center bg-gray-100 p-20">
				<div className="shrink grow-0 basis-[96rem] rounded-md border border-gray-100 bg-white p-20 text-center">
					<h1 className="mb-6">Something went wrong 🙄</h1>
					<p className="mb-12 text-gray-500">{error.message}</p>
					<button className="rounded-sm border-none px-10 py-5 text-2xl font-medium shadow-md" onClick={resetErrorBoundary}>
						Try again
					</button>
				</div>
			</div>
		</>
	);
};
export default ErrorFallback;
