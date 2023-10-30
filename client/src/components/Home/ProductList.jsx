import { Row } from "react-bootstrap";
import ProductCard from "../ProductCard";
import { useParams } from "react-router-dom";

const ProductList = ({ products }) => {
    const productSlug = useParams();

    return (
        <section className="my-5 mb-3">
            <h2 className="text-center mt-4 mb-3">EXPLORE MEN'S SHIRTS</h2>

            <Row className="m-5">
                {products.slice(0, 4).map((product) => (
                    <ProductCard
                        key={product.title}
                        product={product}
                        productSlug={productSlug}
                    />
                ))}
            </Row>
        </section>
    );
};

export default ProductList;
