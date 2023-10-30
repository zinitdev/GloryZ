import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import slider1 from "../assets/images/banner/slider-1.jpg";
import slider2 from "../assets/images/banner/slider-2.jpg";
import slider3 from "../assets/images/banner/slider-3.jpg";
import Error from "../pages/Error";
import ProductList from "../components/Home/ProductList";
import "react-lazy-load-image-component/src/effects/blur.css";
import thumb1 from "../assets/images/thumb/gallery-1.jpg";
import thumb2 from "../assets/images/thumb/gallery.jpg";
import Banner from "../components/Home/Banner";
import Feature from "../components/Home/Feature";
import { Container } from "react-bootstrap";
import useProducts from "../utils/hooks/useProducts";

const Home = () => {
    const banners = [
        {
            id: 1,
            image: slider1,
            title: "Sales product banner 1",
        },
        {
            id: 2,
            image: slider2,
            title: "Sales product banner 2",
        },
        {
            id: 3,
            image: slider3,
            title: "Sales product banner 3",
        },
    ];

    const navigate = useNavigate();

    const { products, error } = useProducts();

    if (cookie.load("token") === null) {
        navigate("/login");
    }

    if (error) return <Error />;

    return (
        <div>
            <Banner banners={banners} />

            <Container className="my-5">
                {!products ? (
                    <div>Loading...</div>
                ) : (
                    <ProductList products={products} />
                )}

                <Feature
                    img={thumb1}
                    title="70 YEARS OF THE HORSEBIT SHIRT "
                    description="Paul Mescal and Global Brand Ambassador Xiao Zhan celebrate the iconic style in a new campaign."
                    linkText="EXPLORE THE WORLD OF HORSEBIT 1953 SHIRT"
                    linkTo="/"
                    reverse={false}
                />

                <Feature
                    img={thumb2}
                    title="70 YEARS OF THE HORSEBIT SHIRT "
                    description="Paul Mescal and Global Brand Ambassador Xiao Zhan celebrate the iconic style in a new campaign."
                    linkText="EXPLORE THE WORLD OF HORSEBIT 1953 SHIRT"
                    linkTo="/"
                    reverse={true}
                />
            </Container>
        </div>
    );
};

export default Home;
