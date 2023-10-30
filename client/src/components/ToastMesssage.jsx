import { Badge, Card, Col, Row, Toast } from "react-bootstrap";

const ToastMesssage = ({ message, variant, product, formattedPrice }) => {
    return (
        <>
            <Toast.Header closeButton={false}>
                <strong className="me-auto">Add to Shopping Cart</strong>
                <small className={`text-${variant} fw-bold`}>{message}</small>
            </Toast.Header>
            <Toast.Body>
                <Card>
                    <Row className="align-items-center justify-content-center">
                        <Col md={4}>
                            <Card.Img src={product.image} />
                        </Col>
                        <Col md={8}>
                            <Card.Body>
                                <Card.Title className="text-uppercase">
                                    {product.title}
                                </Card.Title>
                                <Card.Text>
                                    <small className="text-muted">
                                        {product.slug}
                                    </small>
                                </Card.Text>
                                <Card.Text>
                                    <span>{formattedPrice}</span>
                                </Card.Text>
                                <Card.Text>
                                    {product.tags.map((tag) => {
                                        return (
                                            <Badge
                                                bg="primary"
                                                key={tag.id}
                                                className="me-2"
                                            >
                                                {tag.name}
                                            </Badge>
                                        );
                                    })}
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Toast.Body>
        </>
    );
};

export default ToastMesssage;
