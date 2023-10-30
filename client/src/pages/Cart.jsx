import {
    Container,
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Card,
    Badge,
    Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USDollar } from "../utils/common/PriceFormat";
import formatAsPercentage from "../utils/common/PercentFormat";
import { AiOutlineDelete } from "react-icons/ai";
import { addToCart, removeFromCart } from "../redux/actions/CartActions";
import AlertMessage from "../components/AlertMessage";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Container className="p-3">
            <Row className="d-flex justify-content-center px-3">
                <Col xs={12} sm={12} md={8}>
                    <h1 className="text-center my-4">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <AlertMessage
                            text={"There are currently no products."}
                            state={"light"}
                        />
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row className="shadow py-3 align-items-center">
                                        <Col xs={12} md={4} lg={3}>
                                            <Link
                                                className="text-dark text-decoration-none"
                                                to={`/collections/${item.slug}`}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    rounded
                                                    className="img-fluid"
                                                />
                                            </Link>
                                        </Col>

                                        <Col xs={9} md={4} lg={3}>
                                            <h5 className="text-dark">
                                                {item.title}
                                            </h5>

                                            <p className="text-muted fs-7">
                                                {item.product}
                                            </p>

                                            <p className="fs-7">
                                                Discount:{" "}
                                                <Badge className="bg-transparent text-danger fs-6">
                                                    {formatAsPercentage(
                                                        item.discount
                                                    )}
                                                </Badge>
                                            </p>
                                        </Col>

                                        <Col xs={12} md={4} lg={2}>
                                            <p>
                                                {USDollar.format(
                                                    item.new_price
                                                )}
                                            </p>
                                            <p className="text-muted fs-7 text-decoration-line-through">
                                                {USDollar.format(item.price)}
                                            </p>
                                        </Col>

                                        <Col xs={12} md={9} lg={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.slug,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.amount
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>

                                        <Col
                                            xs={12}
                                            md={3}
                                            lg={2}
                                            className="my-2"
                                        >
                                            <Button
                                                type="button"
                                                variant="outline-dark"
                                                className="shadow-sm"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            >
                                                <AiOutlineDelete size={20} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col xs={12} sm={12} md={4}>
                    <Card className="border-0">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0
                                    )}
                                    ) items
                                </h2>
                                <p className="text-muted">
                                    Total Price:{" "}
                                    <span className="text-danger fw-bold">
                                        {USDollar.format(
                                            cartItems
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.quantity *
                                                            item.new_price,
                                                    0
                                                )
                                                .toFixed(2)
                                        )}
                                    </span>
                                </p>
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item>
                            <Link
                                className="w-100 btn btn-outline-primary"
                                to={"/checkout"}
                                disabled={cartItems.length === 0}
                            >
                                Proceed To Checkout
                            </Link>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
