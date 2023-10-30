import { useEffect, useState } from "react";
import requestAPI, { endpoints } from "../../api/API";

const useCategories = () => {
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAPICategories = async () => {
            try {
                const response = await requestAPI.get(endpoints["categories"]);
                setCategories(response.data);
            } catch (error) {
                setError(error);

                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error("Error", error.message);
                }
            }
        };

        fetchAPICategories();
    }, []);

    return { categories: categories, error: error };
};

export default useCategories;
