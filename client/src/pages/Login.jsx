import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/configs";
import { useContext, useState } from "react";
import requestAPI, { endpoints } from "../api/API";
import cookie from "react-cookies";
import UserContext from "../utils/context/UserContext";
import { USER_LOGIN_REQUEST } from "../redux/constants/constants";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [user, dispatch] = useContext(UserContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data, event) => {
        event.preventDefault();
        try {
            setLoading(true);
            data = {
                grant_type: "password",
                ...data,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            };

            let res = await requestAPI.post(endpoints["login"], data);

            cookie.save("token", res.data.access_token);

            let user = await requestAPI.get(endpoints["current_user"], {
                headers: {
                    Authorization: `Bearer ${cookie.load("token")}`,
                },
            });

            cookie.save("current-user", user.data);

            dispatch({
                type: USER_LOGIN_REQUEST,
                payload: user.data,
            });

            navigate("/");
        } catch (error) {
            for (let i of Object.values(error.response.data)) setError(i);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5 py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    {error && <p clasName="">{error}</p>}
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-4 bg-light"
                    >
                        <h1 className="mb-3 text-center">Log In</h1>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                {...register("username", { required: true })}
                            />
                            {errors.username && (
                                <Form.Text className="text-danger">
                                    Username is required
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <Form.Text className="text-danger">
                                    Password is required
                                </Form.Text>
                            )}
                        </Form.Group>

                        <div className="d-grid gap-2 mt-3">
                            {loading ? (
                                <Button variant="primary" block disabled>
                                    <Spinner
                                        animation="border"
                                        role="status"
                                        className="me-2"
                                    ></Spinner>
                                    Loading...
                                </Button>
                            ) : (
                                <Button variant="primary" type="submit" block>
                                    Log In
                                </Button>
                            )}
                        </div>

                        <Container className="mt-3 d-grid gap-2">
                            <Link to="/register" className="btn btn-secondary">
                                Register
                            </Link>
                        </Container>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
