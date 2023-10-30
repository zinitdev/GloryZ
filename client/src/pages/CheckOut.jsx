import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/context/UserContext";

const CheckOut = () => {
    const [customer, setCustomer] = useState({
        address: "",
        city: "",
        postal: "",
        country: "",
        order: "",
    });

    const [user, dispatch] = useContext(UserContext);
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/login";

    const handleInputChange = (order) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            order: order,
        }));
    };

    return (
        <div className="my-5">
            <Container>
                <h1 className="mb-5">Checkout</h1>
                <Form>
                    <h3 className="mb-3">Billing Details</h3>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={customer.address}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={customer.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={customer.country}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formZip">
                        <Form.Label>Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="postal"
                            value={customer.postal}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <hr />
                    {user === null ? (
                        <Link
                            to={redirect ? `/login?next=${redirect}` : "/login"}
                            className="btn btn-primary"
                        >
                            Log In
                        </Link>
                    ) : (
                        <Button variant="primary" type="submit">
                            Place Order
                        </Button>
                    )}
                </Form>
            </Container>
        </div>
    );
};

export default CheckOut;
