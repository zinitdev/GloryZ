import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SiTheregister } from "react-icons/si";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestAPI, { endpoints } from "../api/API";

const schema = yup
    .object({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        username: yup
            .string()
            .required()
            .matches(
                /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gm,
                "Username is invalid"
            ),
        email: yup.string().required().email("Email must be a valid email"),
        password: yup.string().required(),
        confirm_password: yup.string().required("Confirm Password is required"),
        sex: yup.string().required(),
    })
    .required();

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            confirm_password: "",
            avatar: useRef(""),
            sex: "Female",
        },
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data, event) => {
        try {
            event.preventDefault();
            data = {
                ...data,
                avatar: data.avatar[0],
            };

            setLoading(true);

            let res = await requestAPI.post(endpoints["register"], data);

            if (res.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            let ex = "";
            for (let i of Object.values(error.response.data))
                ex += `${i} <br />`;

            setError(ex);
        } finally {
            setLoading(false);
        }
    };

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <section className="px-5 py-4">
            {error ? (
                <div
                    className="alert alert-danger"
                    dangerouslySetInnerHTML={{ __html: error }}
                ></div>
            ) : (
                ""
            )}
            <h1 className="mb-3">Register</h1>
            <p className="fst-italic">
                Create a new account <SiTheregister />
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-2">
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={6}
                        controlId="formGridFirstName"
                    >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            {...register("first_name", {
                                required: true,
                                maxLength: 125,
                            })}
                            aria-invalid={errors.first_name ? "true" : "false"}
                        />
                        <Form.Text id="firstNameHelpBlock" muted>
                            Your first name must be 8-20 characters long,
                            contain letters.
                        </Form.Text>
                        {errors.first_name?.type === "required" && (
                            <p className="text-danger fs-7">
                                First name is required
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={6}
                        controlId="formGridLastName"
                    >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            {...register("last_name", {
                                required: true,
                                maxLength: 125,
                            })}
                        />
                        <Form.Text id="lastNameHelpBlock" muted>
                            Your last name must be 8-20 characters long, contain
                            letters.
                        </Form.Text>
                        {errors.last_name?.type === "required" && (
                            <p className="text-danger fs-7">
                                Last name is required
                            </p>
                        )}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={6}
                        controlId="formGridUsername"
                    >
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            {...register("username", {
                                required: true,
                                maxLength: 125,
                            })}
                        />
                        <Form.Text id="usernameHelpBlock" muted>
                            Your username must be 8-20 characters long, contain
                            letters and numbers, and must not contain spaces,
                            special characters.
                        </Form.Text>
                        {errors.username?.type === "required" && (
                            <p className="text-danger fs-7">
                                Username is required
                            </p>
                        )}
                        {errors.username?.type === "matches" && (
                            <p className="text-danger fs-7">
                                Username is invalid
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={6}
                        controlId="formGridEmail"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            {...register("email", {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        <Form.Text id="emailHelpBlock" muted>
                            Your email must be a valid email
                        </Form.Text>
                        {errors.email?.message && (
                            <p className="text-danger fs-7">
                                {errors.email?.message}
                            </p>
                        )}
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={4}
                        controlId="formGridPassword"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            {...register("password", {
                                required: true,
                                maxLength: 125,
                                pattern:
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            })}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain
                            letters and numbers, and must not contain spaces,
                            special characters, or emoji.
                        </Form.Text>
                        {errors.password?.type === "required" && (
                            <p className="text-danger fs-7">
                                Password is required
                            </p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className="text-danger fs-7">
                                Password must contain at least one uppercase
                                letter, one lowercase letter, one number, and be
                                at least 8 characters long
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={4}
                        controlId="formGridConfirmPassword"
                    >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Confirm Password"
                            {...register("confirm_password", {
                                required: true,
                                validate: (value) =>
                                    value === password.current ||
                                    "The passwords do not match",
                            })}
                        />
                        {errors.confirm_password?.message && (
                            <p className="text-danger fs-7">
                                {errors.confirm_password?.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        xs={12}
                        sm={12}
                        md={4}
                        controlId="formGridAvatar"
                    >
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" {...register("avatar", {})} />
                        <Form.Text id="avatarHelpBlock" muted>
                            Upload your avatar
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Form.Group as={Col} className="mb-3">
                    <Form.Check
                        inline
                        label="Female"
                        name="sex"
                        type="radio"
                        id="inline-radio-female"
                        value="Female"
                        {...register("sex", {
                            required: true,
                        })}
                    />
                    <Form.Check
                        inline
                        label="Male"
                        name="sex"
                        type="radio"
                        id="inline-radio-male"
                        value="Male"
                        {...register("sex", {
                            required: true,
                        })}
                    />
                    {errors.sex?.message && (
                        <p className="text-danger fs-7">
                            {errors.sex?.message}
                        </p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        id="validationCheck"
                        {...register}
                        label="Agree to terms and conditions"
                    />
                </Form.Group>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                )}
            </Form>
        </section>
    );
};

export default Register;
