import { Container, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { BsBook, BsCloudDownload, BsShieldShaded } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRegGrinBeam } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const About = () => {
    return (
        <div className="about">
            <Container>
                <Row className="mt-5 mb-3">
                    <Col md={8}>
                        <h1>About Us</h1>
                        <p>
                            Born in 2016. G L O R Y Z has the ambition and goal
                            to become an effective clothing solution to maximize
                            the expression of each person's personality. In the
                            beginning, the startup encountered many difficulties
                            because the product orientation and messages
                            conveyed to customers were not specific.
                        </p>
                        <p>
                            During that time, the concept had to be constantly
                            changed. and wanted to give up many times. But
                            youthful ambition still motivates every day.
                        </p>
                        <p>
                            Up to now, G L O R Y Z has had a direction and is
                            asserting a stable position in the youth fashion
                            segment.
                        </p>
                        <p>
                            Leading the trend of short-sleeved shirts with
                            eye-catching patterns and high aesthetic taste.
                            Products and messages are always welcomed and
                            accepted by young people.
                        </p>
                        <p>
                            Outstanding advantages in product quality as well as
                            G L O R Y Z's distinctive sales culture are the
                            foundation for the G L O R Y Z team to realize its
                            ambition to expand and dominate the market.
                        </p>
                        <p>Modern, trendy, individual and outstanding style.</p>
                        <p>
                            These are typical keywords when mentioning culture
                        </p>
                        <h3>Our Vision</h3>
                        <p>
                            Our vision is to be the leading provider of digital
                            products in the market by delivering innovative,
                            high-quality products that meet the evolving needs
                            of our customers. We want to become a household name
                            and a trusted source for all their digital needs.
                        </p>
                        <h3>Our Mission</h3>
                        <p>
                            Our mission is to empower everyone with easy access
                            to digital products that can improve their lives. We
                            strive to create a seamless experience for customers
                            in terms of browsing, purchasing, and using our
                            products. We continuously innovate our products to
                            ensure they are user-friendly, reliable, and secure.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h3>Why Choose Us</h3>
                        <ul className="list-unstyled ml-3">
                            <li>
                                <FaStar className="me-2" />
                                High Quality Products
                            </li>
                            <li>
                                <BsBook className="me-2" />
                                Rich Product Catalogue
                            </li>
                            <li>
                                <BsCloudDownload className="me-2" />
                                Instant Downloads
                            </li>
                            <li>
                                <BsShieldShaded className="me-2" />
                                100% Secure Payments
                            </li>
                            <li>
                                <AiOutlineTeam className="me-2" />
                                Professional Team
                            </li>
                            <li>
                                <FaRegGrinBeam className="me-2" />
                                Excellent Customer Service
                            </li>
                            <li>
                                <MdSecurity className="me-2" />
                                Strong Data Security
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
