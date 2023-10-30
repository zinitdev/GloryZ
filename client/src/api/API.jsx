import axios from "axios";
import { SERVER_URL } from "../configs/configs";

export let endpoints = {
    categories: "/categories/",
    products: "/products/",
    querys: (cateSlug) => `/products/?search=${cateSlug}/`,
    product_details: (productSlug) => `/products/${productSlug}/`,
    register: "/users/",
    login: "/auth/token/",
    current_user: "/users/current-user/",
    comments: (productSlug) => `products/${productSlug}/comments/`,
    delete_comments: (commentId) => `comments/${commentId}/`,
    orders: "/orders/"
};

const requestAPI = axios.create({
    baseURL: SERVER_URL,
});

requestAPI.defaults.headers.post["Content-Type"] = "multipart/form-data";

export default requestAPI;
