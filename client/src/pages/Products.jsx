import useProducts from "../utils/hooks/useProducts";
import useBreadcrumbs from "../utils/hooks/useBreadcrumbs";
import {
    Button,
    Col,
    Form,
    FormControl,
    InputGroup,
    Pagination,
    Row,
    Spinner,
} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { PAGE_SIZE } from "../redux/constants/constants";
import NoProduct from "../components/NoProduct";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Products = () => {
    const { products, page, error: productError } = useProducts();
    const { breadcrumbs, error: breadcrumbError } = useBreadcrumbs();
    const [min_price, setMinPrice] = useState("");
    const [max_price, setMaxPrice] = useState("");
    const [order, setOrder] = useState("title");
    const [activePage, setActivePage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(page / PAGE_SIZE);
    const navigate = useNavigate();

    if (productError || breadcrumbError) {
        return (
            <section className="container my-5">
                <p>
                    <Spinner
                        animation="border"
                        role="status"
                        className="me-2"
                    ></Spinner>
                    <i>Fetch API error . . .</i>
                </p>
            </section>
        );
    }

    if (!products) return <NoProduct />;

    const handleFilter = (evt) => {
        evt.preventDefault();
        navigate(
            `/collections/?min_price=${min_price}&max_price=${max_price}&ordering=${order}`
        );
    };

    const handleSortChange = (event) => {
        setOrder(event.target.value);
    };

    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1);
        const prevPage = currentPage - 1;
        window.history.pushState(null, `/collections/?page=${prevPage}`);
        setActivePage(prevPage);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        setActivePage(page);
        window.history.pushState(null, `/collections/?page=${page}`);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
        const nextPage = currentPage + 1;
        window.history.pushState(null, `/collections/page=${nextPage}`);
        setActivePage(nextPage);
    };

    const listItems = products.map((product) => (
        <ProductCard key={product.id} product={product} />
    ));

    let items = [];
    for (let i = 0; i < totalPages; i++) {
        items.push(
            <Pagination.Item
                className={
                    "page-item" + (i + 1 === activePage ? " active" : "")
                }
                key={i}
                onClick={() => handlePageClick(i + 1)}
            >
                {i + 1}
            </Pagination.Item>
        );
    }

    return (
        <>
            <Row className="m-5">
                <span>
                    <Link to="/">Home</Link> /{" "}
                    {breadcrumbs.map((bc, index) => (
                        <span className="breadcrumbs" key={index}>
                            <Link to={`${bc.link}`}>{bc.name}</Link>
                            {index < breadcrumbs.length - 1 && " / "}
                        </span>
                    ))}
                </span>
            </Row>

            <Row className="m-5 border-bottom">
                <Col xs={12} md={3}>
                    <h4 className="text-uppercase">Filters</h4>
                    <Form onSubmit={handleFilter}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Min"
                                onChange={(event) =>
                                    setMinPrice(event.target.value)
                                }
                            />
                            <InputGroup.Text>-</InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Max"
                                onChange={(event) =>
                                    setMaxPrice(event.target.value)
                                }
                            />
                        </InputGroup>
                        <h6 className="text-uppercase">Sort</h6>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Control
                                as="select"
                                aria-label="sort"
                                onChange={handleSortChange}
                            >
                                <option value={"title"}>Name, A to Z</option>
                                <option value={"-title"}>Name, Z to A</option>
                            </Form.Control>
                        </Form.Group>
                        <Button className="mt-2" type="submit">
                            Filter
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} md={9}>
                    <div className="d-flex mb-3 align-items-center justify-content-between">
                        <h4 className="text-uppercase mb-0">All Products</h4>
                    </div>
                    <Row>
                        {listItems.length === 0 ? <NoProduct /> : listItems}
                    </Row>
                    <Pagination className="justify-content-center my-2 text-primary">
                        <Pagination.Prev
                            onClick={handlePrevClick}
                            disabled={currentPage === 1}
                        />
                        {items}
                        <Pagination.Next
                            onClick={handleNextClick}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
};

export default Products;
