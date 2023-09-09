const AppFooter = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-auto border-t border-t-gray-300/60 py-5 shadow-[0_-20px_60px_-15px_rgba(20,184,166,0.16)]">
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-sm font-medium">all copyrights reserved My News {year} &copy;</div>
				<div className="font-bold text-teal-500">Designed & developed with ❤️</div>
			</div>
		</footer>
	);
};
export default AppFooter;
