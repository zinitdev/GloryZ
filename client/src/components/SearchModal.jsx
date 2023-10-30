import { useState } from "react";
import { Button, Modal, Nav, Form, Container } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchModal = () => {
    const [show, setShow] = useState(false);
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = (evt) => {
        evt.preventDefault();
        navigate(`/collections/?search=${keyword}`);
    };

    return (
        <>
            <Nav.Link href="#" onClick={handleShow}>
                <CiSearch size={25} />
            </Nav.Link>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <h4 className="mb-3 fst-merriweather">
                            What are you search?
                        </h4>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                className="me-sm-2"
                                value={keyword}
                                onChange={event => setKeyword(event.target.value)}
                            />
                            <Button type="submit" variant="primary">
                                <CiSearch size={20} />
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchModal;
