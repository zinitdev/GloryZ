import { lazy } from "react";

const routers = [
    {
        path: "/",
        component: lazy(() => import("../pages/Home")),
        index: true,
    },
    {
        path: "/home",
        component: lazy(() => import("../pages/Home")),
        index: true,
    },
    {
        path: "/collections/all-product",
        component: lazy(() => import("../pages/Products")),
    },
    {
        path: "/collections",
        component: lazy(() => import("../pages/Products")),
    },
    {
        path: "/collections/:productSlug",
        component: lazy(() => import("../pages/ProductDetail")),
    },
    {
        path: "/about-us",
        component: lazy(() => import("../pages/About")),
    },
    {
        path: "/register",
        component: lazy(() => import("../pages/Register")),
    },
    {
        path: "/login",
        component: lazy(() => import("../pages/Login")),
    },
    {
        path: "/cart",
        component: lazy(() => import("../pages/Cart")),
    },
    {
        path: "/checkout",
        component: lazy(() => import("../pages/CheckOut")),
    },
    {
        path: "/checkout/thank-you",
        component: lazy(() => import("../pages/ThankYou")),
    },
    { path: "*", component: lazy(() => import("../pages/Error")) },
    {
        path: "/profile/:username",
        component: lazy(() => import("../pages/Profile")),
    },
    {
        path: "/refund-policy",
        component: lazy(() => import("../pages/RefundPolicy")),
    },
];

export default routers;
