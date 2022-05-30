import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const controller = new AbortController();

	useEffect(() => {
		setIsLoading(true);
		setData(null);

		axios
			.get(url)
			.then((response) => {
				setData(response.data);
				setError(null);
			})
			.catch((err) => {
				console.log(err.message);
				setError("Could not fetch the data😥😥");
			})
			.finally(() => {
				setIsLoading(false);
			});

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, isLoading, error };
}

export default useFetch;
