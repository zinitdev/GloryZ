import { Button, Col, Form, Row } from "react-bootstrap";
import {
    CiFacebook,
    CiHome,
    CiInstagram,
    CiPhone,
    CiTwitter,
    CiVoicemail,
} from "react-icons/ci";
import { Link } from "react-router-dom";
import useCategories from "../utils/hooks/useCategories";

const FooterBlock = ({ title, children }) => {
    return (
        <Col xs={12} md={6} lg={4}>
            <p className="fs-5">{title}</p>
            <ul>{children}</ul>
        </Col>
    );
};

const FooterLink = ({ href, icon, label }) => {
    return (
        <li>
            <Link to={href} className="fs-6 text-white">
                {icon && <i className={icon} />} {label}
            </Link>
        </li>
    );
};

const Footer = () => {
    const { categories, error } = useCategories();

    if (error) return null;

    return (
        <footer className="footer bg-primary text-white">
            <div className="container">
                <Row className="pt-5 pb-2 fs-6">
                    <Col xs={12} md={3} lg={2}>
                        <Link
                            href="#"
                            className="navbar-brand text-white fst-logo fs-3"
                        >
                            G L O R Y Z
                        </Link>
                        <p className="fst-italic pt-3 fs-6">
                            You order, we deliver
                        </p>
                    </Col>
                    <Col xs={12} md={5} lg={7}>
                        <p style={{ textAlign: "justify" }}>
                            Born in 2022. GloryZ has the ambition and goal to
                            become an effective clothing solution to maximize
                            the expression of each person's personality. In the
                            beginning, the startup encountered many difficulties
                            because the product orientation and messages
                            conveyed to customers were not specific.
                        </p>
                    </Col>
                    <FooterBlock title="Contact Us">
                        <FooterLink
                            icon={<CiPhone size={20} />}
                            href="tel:+241245654235"
                            label="+91 1111 1111 111"
                        />
                        <FooterLink
                            icon={<CiVoicemail size={20} />}
                            href="mailto:zin.it.dev@gmail.com"
                            label="zin.it.dev@gmail.com"
                        />
                        <FooterLink
                            icon={<CiHome size={20} />}
                            href="#"
                            label="Ho Chi Minh City, VietNam"
                        />
                    </FooterBlock>
                </Row>
                <Row className="py-4">
                    <FooterBlock title="Categories">
                        {categories.map((category) => {
                            return (
                                <FooterLink
                                    key={category.id}
                                    href="#"
                                    label={category.name}
                                />
                            );
                        })}
                    </FooterBlock>
                    <FooterBlock title="Need Help?">
                        <FooterLink href="#" label="Terms & Conditions" />
                        <FooterLink href="#" label="Privacy Policy" />
                        <FooterLink href="#" label="Refund Policy" />
                        <FooterLink href="#" label="Affiliate" />
                        <FooterLink href="#" label="Use Cases" />
                    </FooterBlock>
                    <Col xs={12} md={6} lg={4}>
                        <p className="fs-5">Follow us</p>
                        <ul className="list-unstyled d-flex">
                            <li className="me-3">
                                <Link
                                    className="text-white"
                                    to="https://www.facebook.com/zin.it.dev"
                                >
                                    <CiFacebook size={25} />
                                </Link>
                            </li>
                            <li className="me-3">
                                <Link
                                    className="text-white"
                                    to={"https://www.instagram.com/zin.dev"}
                                >
                                    <CiInstagram size={25} />
                                </Link>
                            </li>
                            <li className="me-3">
                                <Link
                                    className="text-white"
                                    to={"https://twitter.com/zinitdev"}
                                >
                                    <CiTwitter size={25} />
                                </Link>
                            </li>
                        </ul>
                        <div className="py-2">
                            <p className="fs-6">Newsletter Sign Up</p>
                            <Form>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            className="mr-sm-2"
                                            type="email"
                                            name="email_address"
                                            aria-label="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            type="submit"
                                            variant="outline-light"
                                        >
                                            Send
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <p className="fs-6">
                        &copy; 2016 - 2022 GloryZG{" "}
                        <Link href="#" className="fs-6 text-white">
                            GloryZ{" "}
                        </Link>
                        S.p.A. - All rights reserved. SIAE LICENCE # 2294/I/1936
                        and 5647/I/1936.
                    </p>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
