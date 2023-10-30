import { useEffect, useState } from "react";
import requestAPI, { endpoints } from "../../api/API";

const useProductDetail = (productSlug) => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAPIProduct = async () => {
            try {
                const response = await requestAPI.get(
                    endpoints["product_details"](productSlug)
                );

                const data = await response.data;
                setProduct(data);
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

        fetchAPIProduct();
    }, [productSlug]);

    return { product: product, error: error };
};

export default useProductDetail;
