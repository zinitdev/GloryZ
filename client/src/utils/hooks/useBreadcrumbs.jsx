import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requestAPI, { endpoints } from "../../api/API";

const useBreadcrumbs = () => {
    const [error, setError] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const productSlug = useParams();

    useEffect(() => {
        const fetchBreadcrumb = async () => {
            try {
                const response = await requestAPI.get(endpoints["categories"]);
                setBreadcrumbs(
                    response.data.map((category) => ({
                        name: category.name,
                        link: `/collections/?category=${encodeURI(
                            category.slug
                        )}`,
                    }))
                );
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
        fetchBreadcrumb();
    }, [productSlug.slug]);

    return { breadcrumbs: breadcrumbs, error: error };
};

export default useBreadcrumbs;
