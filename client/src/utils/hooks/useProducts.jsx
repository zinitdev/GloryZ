import { useEffect, useState } from "react";
import requestAPI, { endpoints } from "../../api/API";
import { useLocation, useSearchParams } from "react-router-dom";

const useProducts = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState();
    const [q] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const fetchAPIProducts = async (page = "?page=1") => {
            try {
                setLoading(true);
                let endpoint = `${endpoints["products"]}${page}`;

                let search = q.get("search");

                if (search != null) endpoint += `&search=${search}`;

                let category = q.get("category");
                if (category !== null)
                    endpoint += `&category__slug=${category}`;

                let min_price = q.get("min_price");
                let max_price = q.get("max_price");

                if (min_price != null || max_price != null)
                    endpoint += `&min_price=${min_price}&max_price=${max_price}`;

                const response = await requestAPI.get(endpoint);

                const data = await response.data.results;

                setProducts(data);
                setPage(response.data.count);
            } catch (error) {
                setLoading(true);
                setError(error);
                setPage(1);
            }
        };

        fetchAPIProducts(location.search);
    }, [q, location.search]);

    return {
        products: products,
        page: page,
        error: error,
        loading: loading,
    };
};

export default useProducts;
