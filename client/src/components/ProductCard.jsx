import { Badge, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { USDollar } from "../utils/common/PriceFormat";
import formatAsPercentage from "../utils/common/PercentFormat";

const ProductCard = ({ product }) => {
    const formattedPrice = USDollar.format(product.new_price);

    const isActive = product.is_active ? (
        <Card.Text className="mb-2 text-muted fs-7 fst-italic">
            Stocked
        </Card.Text>
    ) : (
        <Card.Text className="mb-2 text-muted fs-7 fst-italic text-decoration-line-through">
            No Stock
        </Card.Text>
    );

    return (
        <Col xs={12} sm={6} md={6} lg={3}>
            <Link
                className="text-decoration-none"
                to={`/collections/${encodeURI(product.slug)}`}
            >
                <Card className="border-0 position-relative">
                    <Badge className="position-absolute top-0 start-0 bg-transparent text-danger">
                        {formatAsPercentage(product.discount)}
                    </Badge>
                    <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.title}
                    />
                    <Card.Body className="text-center">
                        <Card.Title className="fst-merriweather fs-7">
                            {product.title}
                        </Card.Title>
                        {isActive}
                        <Card.Text className="text-danger lato fw-bold fs-7">
                            {formattedPrice}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default ProductCard;
