import { Link, useParams } from "react-router-dom";
import useProductDetail from "../utils/hooks/useProductDetail";
import Error from "../pages/Error";
import { AiOutlineDelete } from "react-icons/ai";
import {
    Accordion,
    Badge,
    Card,
    Col,
    Row,
    Toast,
    ToastContainer,
    Button,
    Form,
    Spinner,
} from "react-bootstrap";
import { USDollar } from "../utils/common/PriceFormat";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/CartActions";
import formatAsPercentage from "../utils/common/PercentFormat";
import ToastMesssage from "../components/ToastMesssage";
import NoProduct from "../components/NoProduct";
import AddProductButton from "../components/AddProductButton";
import RemoveProductButton from "../components/RemoveProductButton";
import BuyNowButton from "../components/BuyNowButton";
import requestAPI, { endpoints } from "../api/API";
import UserContext from "../utils/context/UserContext";
import Avatar from "../components/Avatar";
import Moment from "react-moment";
import cookie from "react-cookies";

const ProductDetail = () => {
    const [statusCart, setStatusCart] = useState(false);
    const { productSlug } = useParams();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState(null);
    const [size, setSize] = useState("S");
    const [color, setColor] = useState("#FFFFFF");
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState("");
    const [user] = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const { product, error } = useProductDetail(productSlug);

    useEffect(() => {
        const loadComments = async () => {
            let res = await requestAPI.get(endpoints["comments"](productSlug));
            setComments(res.data);
        };

        loadComments();
    }, [productSlug]);

    const addComment = (event) => {
        event.preventDefault();

        const process = async () => {
            try {
                const data = {
                    content: content,
                };

                let res = await requestAPI.post(
                    endpoints["comments"](productSlug),
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${cookie.load("token")}`,
                        },
                    }
                );
                setComments((curr) => [res.data, ...curr]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        process();
    };

    const deleteComment = (commentId) => {
        const process = async () => {
            try {
                setLoading(true);
                await requestAPI.delete(
                    endpoints["delete_comments"](commentId),
                    {
                        headers: {
                            Authorization: `Bearer ${cookie.load("token")}`,
                        },
                    }
                );
                setComments(
                    comments.filter((comment) => comment.id !== commentId)
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        process();
    };

    if (!product) return <NoProduct />;

    if (error) return <Error />;

    const isActive = product.is_active ? (
        <Card.Text className="mb-2 text-muted fs-5 fst-italic">
            Stocked
        </Card.Text>
    ) : (
        <Card.Text className="mb-2 text-muted fs-6 fst-italic text-decoration-line-through">
            No Stock
        </Card.Text>
    );

    const cartAddButtonHandler = () => {
        dispatch(addToCart(product.slug, 1, size, color));

        setStatusCart(true);
        setMessage("Added");
        setVariant("success");
        setShow(true);
    };

    const cartRemoveButtonHandler = (id) => {
        dispatch(removeFromCart(id));
        setStatusCart(false);
        setMessage("Removed");
        setVariant("danger");
        setShow(true);
    };

    return (
        <>
            <ToastContainer
                className="p-3"
                position={"top-end"}
                style={{ zIndex: 10000 }}
            >
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    <ToastMesssage
                        product={product}
                        message={message}
                        variant={variant}
                        formattedPrice={USDollar.format(product.new_price)}
                    />
                </Toast>
            </ToastContainer>
            <section className="container my-5">
                <Row>
                    <Col lg={6} md={6}>
                        <Card className="border-0 position-relative">
                            <Badge className="position-absolute top-0 start-0 bg-transparent text-danger fs-5">
                                {formatAsPercentage(product.discount)}
                            </Badge>
                            <Card.Img
                                src={product.image}
                                alt={product.title}
                                title={product.title}
                            />
                        </Card>
                    </Col>
                    <Col lg={6} md={6}>
                        <Card className="border-0">
                            <Card.Body>
                                <Card.Title className="fst-merriweather fs-2 text-uppercase text-primary">
                                    {product.title}
                                </Card.Title>
                                {isActive}
                                <Card.Text className="lato fs-4">
                                    <span className="me-2 fw-bold text-primary">
                                        {USDollar.format(product.new_price)}
                                    </span>
                                    <small className="text-normal text-decoration-line-through text-muted">
                                        {USDollar.format(product.price)}
                                    </small>
                                </Card.Text>
                                <div className="mb-3">
                                    {product.size_variant.map((size) => {
                                        return (
                                            <Form.Check
                                                inline
                                                key={size.id}
                                                label={size.value}
                                                name="size"
                                                value={size.value}
                                                type="radio"
                                                id={`inline-${size.value}-1`}
                                                onChange={(e) =>
                                                    setSize(e.target.value)
                                                }
                                                defaultChecked={
                                                    size.value === "S"
                                                }
                                            />
                                        );
                                    })}
                                </div>
                                <div className="mb-3">
                                    {product.color_variant.map((color) => {
                                        return (
                                            <Form.Check
                                                className="rounded-circle border-0 p-0 me-3 shadow"
                                                style={{
                                                    backgroundColor: `${color.value}`,
                                                    width: "30px",
                                                    height: "30px",
                                                    padding: "0px",
                                                    borderRadius: "50%",
                                                }}
                                                inline
                                                key={color.id}
                                                name="color"
                                                value={color.value}
                                                type="radio"
                                                id={`inline-${color.value}-1`}
                                                onChange={(e) =>
                                                    setColor(e.target.value)
                                                }
                                                defaultChecked={
                                                    color.value === "#FFFFFF"
                                                }
                                            />
                                        );
                                    })}
                                </div>
                                <div className="d-grid gap-2">
                                    {!statusCart && (
                                        <AddProductButton
                                            cartAddButtonHandler={
                                                cartAddButtonHandler
                                            }
                                        />
                                    )}
                                    {statusCart && (
                                        <RemoveProductButton
                                            cartRemoveButtonHandler={
                                                cartRemoveButtonHandler
                                            }
                                            product={product}
                                        />
                                    )}

                                    <BuyNowButton />
                                </div>

                                <div className="my-3">
                                    <h4 className="fst-merriweather text-primary">
                                        Product Details
                                    </h4>
                                    <Accordion defaultActiveKey="3">
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>
                                                Reviews
                                            </Accordion.Header>
                                            <Accordion.Body className="lato fs-6 fst-italic">
                                                {comments === null ? (
                                                    <div>Loading...</div>
                                                ) : (
                                                    comments.map((c) => {
                                                        return (
                                                            <Row
                                                                className="bg-white m-1 align-items-center"
                                                                key={c.id}
                                                            >
                                                                <Col
                                                                    md={3}
                                                                    sm={4}
                                                                >
                                                                    <Avatar
                                                                        size={
                                                                            70
                                                                        }
                                                                        user={
                                                                            c.user
                                                                        }
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    md={8}
                                                                    sm={7}
                                                                >
                                                                    <h6 className="lato text-primary">
                                                                        {
                                                                            c
                                                                                .user
                                                                                .username
                                                                        }{" "}
                                                                    </h6>
                                                                    <p className="fst-merriweather">
                                                                        <span className="me-4">
                                                                            {
                                                                                c.content
                                                                            }
                                                                        </span>

                                                                        {user &&
                                                                        user.username ===
                                                                            c
                                                                                .user
                                                                                .username ? (
                                                                            <Button
                                                                                className="fst-italic text-capitalize text-decoration-none"
                                                                                variant="link"
                                                                                size={
                                                                                    "sm"
                                                                                }
                                                                                onClick={() =>
                                                                                    deleteComment(
                                                                                        c.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                {loading ? (
                                                                                    <>
                                                                                        <Spinner
                                                                                            animation="border"
                                                                                            role="status"
                                                                                            size="sm"
                                                                                        ></Spinner>
                                                                                    </>
                                                                                ) : (
                                                                                    <AiOutlineDelete
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </Button>
                                                                        ) : null}
                                                                    </p>
                                                                    <small className="lato">
                                                                        <Moment
                                                                            fromNow
                                                                            locale="en"
                                                                        >
                                                                            {
                                                                                c.date_created
                                                                            }
                                                                        </Moment>
                                                                    </small>
                                                                </Col>
                                                            </Row>
                                                        );
                                                    })
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                SKU
                                            </Accordion.Header>
                                            <Accordion.Body className="fs-5 lato">
                                                {product.id}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                                Tags
                                            </Accordion.Header>
                                            <Accordion.Body className="fs-5 lato">
                                                {product.tags.map((tag) => {
                                                    return (
                                                        <Badge
                                                            bg="primary"
                                                            key={tag.id}
                                                        >
                                                            {tag.name}
                                                        </Badge>
                                                    );
                                                })}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>
                                                Description
                                            </Accordion.Header>
                                            <Accordion.Body className="lato fs-6 fst-italic">
                                                {product.description}
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Comments
                                            </Accordion.Header>
                                            <Accordion.Body className="lato fs-6 fst-italic">
                                                {user === null ? (
                                                    <Link
                                                        to={"/login"}
                                                        className="btn btn-primary"
                                                    >
                                                        Log In
                                                    </Link>
                                                ) : (
                                                    <Form onSubmit={addComment}>
                                                        <Form.Group
                                                            className="mb-3"
                                                            controlId="content"
                                                        >
                                                            <Form.Control
                                                                as="textarea"
                                                                value={content}
                                                                onChange={(e) =>
                                                                    setContent(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={3}
                                                                placeholder="Enter the text comment..."
                                                            />
                                                        </Form.Group>

                                                        {loading ? (
                                                            <Button
                                                                type="submit"
                                                                variant="primary"
                                                                disabled
                                                            >
                                                                <Spinner
                                                                    size={"sm"}
                                                                    animation="border"
                                                                    role="status"
                                                                    className="me-2"
                                                                ></Spinner>
                                                                Loading...
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                type="submit"
                                                                variant="primary"
                                                            >
                                                                Comment
                                                            </Button>
                                                        )}
                                                    </Form>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </>
    );
};

export default ProductDetail;
