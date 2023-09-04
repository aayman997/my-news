import { useSearchParams } from "react-router-dom";

const Explore = () => {
	const [searchParams] = useSearchParams();
	const category = searchParams.get("category");
	console.log(category);

	return <div>Explore</div>;
};
export default Explore;
