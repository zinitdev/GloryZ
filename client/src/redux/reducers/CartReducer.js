import {
    CART_ADD_ITEM,
    CART_CLEAR_ITEMS,
    CART_REMOVE_ITEM,
} from "../constants/constants";

let initState = {
    cartItems: [],
};

if (localStorage.getItem("cart_data")) {
    initState.cartItems = JSON.parse(localStorage.getItem("cart_data"));
} else {
    initState.cartItems = [];
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM: {
            const item = action.payload;
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        }

        case CART_REMOVE_ITEM: {
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };
        }

        case CART_CLEAR_ITEMS: {
            return { ...state, cart: [] };
        }

        default:
            return { ...state };
    }
};

export default cartReducer;
