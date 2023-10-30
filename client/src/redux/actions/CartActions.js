import requestAPI, { endpoints } from "../../api/API";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/constants";

export const addToCart =
    (slug, quantity = 1, size, color) =>
    async (dispatch, getState) => {
        const { data } = await requestAPI.get(
            endpoints["product_details"](slug)
        );

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data.id,
                slug: data.slug,
                title: data.title,
                image: data.image,
                price: data.price,
                discount: data.discount,
                new_price: data.new_price,
                tags: data.tags,
                amount: data.amount,
                size: size,
                color: color,
                quantity: quantity,
            },
        });

        localStorage.setItem(
            "cart_data",
            JSON.stringify(getState().cart.cartItems)
        );
    };

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem(
        "cart_data",
        JSON.stringify(getState().cart.cartItems)
    );
};
