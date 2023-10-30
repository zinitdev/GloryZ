import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Feature = ({ img, title, description, linkText, linkTo, reverse }) => {
    return (
        <section className="my-5">
            <hr className="my-5" />
            <Row
                className={`mb-3 py-3 align-items-center${
                    reverse ? " flex-row-reverse" : ""
                }`}
            >
                <Col md={5}>
                    <Link to={linkTo}>
                        <LazyLoadImage
                            className="object-fit-cover d-block w-100 img-thumbnail"
                            src={img}
                            alt={title}
                            effect="blur"
                        />
                    </Link>
                </Col>
                <Col md={7} className="text-center">
                    <div className="mb-4">
                        <h1 className="fs-1 featurette-heading fw-normal lh-100">
                            {title}
                        </h1>
                        <span className="text-body-secondary fs-5">
                            {description}
                        </span>
                    </div>
                    <Link to={linkTo} className="text-primary">
                        {linkText}
                    </Link>
                </Col>
            </Row>
        </section>
    );
};

export default Feature;
