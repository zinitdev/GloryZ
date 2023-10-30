import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
    return (
        <div className="return-policy">
            <Container>
                <Row className="mt-5 mb-3">
                    <Col md={8}>
                        <h1>Refund Policy</h1>
                        <p>
                            We hope you love our products, but if you are not
                            completely satisfied with your purchase, we will
                            happily accept returns within 30 days of purchase.
                        </p>
                        <p>
                            To initiate a return, please contact our customer
                            service team by email or phone. We will provide you
                            with a return authorization number and instructions
                            for returning your item. Please note that shipping
                            charges for returns are at your own expense.
                        </p>
                        <p>
                            If the product you receive is damaged or defective,
                            we will replace it free of charge. Please contact us
                            within 7 days of receiving your order to report the
                            issue and initiate the replacement process.
                        </p>
                        <p>
                            Once we receive your return, we will inspect it and
                            issue a refund to your original method of payment
                            within 10 business days. Please note that it may
                            take additional time for the refund to appear on
                            your statement.
                        </p>
                        <p>
                            If you have any questions or concerns about our
                            return policy, please do not hesitate to contact us.
                            We are always happy to assist you.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RefundPolicy;
