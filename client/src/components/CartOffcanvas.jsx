import { useState } from "react";
import { Badge, Card, Col, Nav, Offcanvas, Row } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USDollar } from "../utils/common/PriceFormat";
import AlertMessage from "../components/AlertMessage";

const CartOffcanvas = ({ value, title }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <>
            <Nav.Link href="#" onClick={handleShow} title={title}>
                <CiShoppingCart size={25} /> <Badge bg="primary" className="fs-6">{value}</Badge>
            </Nav.Link>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cartItems.length === 0 ? (
                        <AlertMessage
                            text={"There are currently no products."}
                            state={"light"}
                        />
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <Card
                                    key={item.product}
                                    className="mb-3 border-0 shadow-lg"
                                >
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                            <Card.Img
                                                className="rounded-start"
                                                src={item.image}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Card.Body>
                                                <Card.Title className="text-uppercase text-primary">
                                                    {item.title}
                                                </Card.Title>
                                                <Card.Text className="text-uppercase my-2 text-primary">
                                                    {item.size} /{" "}
                                                    <span className="px-2 border border-2 border-primary">
                                                        {item.color}
                                                    </span>
                                                </Card.Text>
                                                <Card.Text>
                                                    <Badge
                                                        bg="primary"
                                                        className="me-2"
                                                    >
                                                        {item.quantity}
                                                    </Badge>
                                                    <small className="text-muted">
                                                        {item.product}
                                                    </small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <span>
                                                        {USDollar.format(
                                                            item.new_price
                                                        )}
                                                    </span>
                                                </Card.Text>
                                                <Link
                                                    to={`/collections/${item.slug}`}
                                                    className="btn btn-outline-primary"
                                                >
                                                    View Details
                                                </Link>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </div>
                    )}
                </Offcanvas.Body>
                <Offcanvas.Body>
                    <div className="d-grid gap-2">
                        <Link
                            to="/checkout"
                            className="btn btn-outline-primary fs-6 text-uppercase"
                            size="lg"
                        >
                            CheckOut
                        </Link>
                        <Link
                            to="/cart"
                            className="btn btn-primary fs-6 text-uppercase"
                            size="lg"
                        >
                            View Shopping Cart
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CartOffcanvas;
