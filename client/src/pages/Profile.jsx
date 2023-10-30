import { useContext, useEffect, useState } from "react";
import UserContext from "../utils/context/UserContext";
import Error from "./Error";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Avatar from "../components/Avatar";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import requestAPI, { endpoints } from "../api/API";

const Profile = () => {
    const user = useContext(UserContext);

    if (user === null) return <Error />;

    return (
        <section className="py-5 container">
            <Row>
                <Col xs={12} md={4}>
                    <Card className="border-0">
                        <Card.Body className="text-center">
                            <Avatar user={user[0]} size={200} />
                            <h1>{user[0].username}</h1>
                            <span>
                                {user[0].is_active ? (
                                    <AiOutlineCheck size={18} />
                                ) : (
                                    "Loading..."
                                )}
                            </span>
                            <p>{user[0].email}</p>
                            <ul className="list-group">
                                <li className="list-group-item border-0">
                                    {user[0].last_login}
                                </li>
                            </ul>
                            <Link
                                to="/profile/edit"
                                className="btn btn-primary"
                            >
                                Edit Profile
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={8}>
                    <ProfileOrders user={user[0]} />
                </Col>
            </Row>
        </section>
    );
};

const ProfileOrders = ({ user }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await requestAPI.get(endpoints["orders"]);

            const data = await response.data.results;

            setOrders(data);
        };
        fetchData();
    }, [user.id]);

    return (
        <Card className="border-0 shadow">
            <Card.Header className="h5">Orders</Card.Header>
            <ListGroup variant="flush">
                {orders.map((order) => (
                    <ListGroup.Item key={order.id}>
                        <div>
                            <p className="card-title fs-5">
                                Order ID: <Link to={""}>{order.id}</Link>
                            </p>

                            {order.orderItems.map((item) => (
                                <Row key={item.id}>
                                    <Col xs={3}>
                                        <Image
                                            src={item.product.image}
                                            width={80}
                                            height={80}
                                        />
                                    </Col>

                                    <Col>
                                        {" "}
                                        <Card.Title className="h6">
                                            {item.product.title}
                                        </Card.Title>
                                    </Col>

                                    <Col xs={5}>
                                        <p className="fs-6">
                                            {item.product.description}
                                        </p>
                                    </Col>

                                    <Col>
                                        <p className="fs-6 m-0">
                                            Price: {item.product.new_price}
                                        </p>
                                        <span className="fs-6">
                                            Quantity: {item.quantity}
                                        </span>
                                    </Col>
                                </Row>
                            ))}

                            <span className="fs-6">
                                Status:{" "}
                                {order.is_active
                                    ? "Already Paid"
                                    : "Waiting for payment"}{" "}
                            </span>
                            <p className="card-text fs-6">
                                <small className="text-muted">
                                    {order.date_created}
                                </small>
                            </p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default Profile;
