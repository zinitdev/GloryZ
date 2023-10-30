import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { CiLogout, CiUser } from "react-icons/ci";
import SearchModel from "../components/SearchModal";
import CartOffcanvas from "../components/CartOffcanvas";
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import UserContext from "../utils/context/UserContext";
import { useSelector } from "react-redux";
import { USER_LOGOUT } from "../redux/constants/constants";
import useCategories from "../utils/hooks/useCategories";

const Header = () => {
    const { categories, error } = useCategories();
    const [user, dispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const cart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const logOut = () => {
        dispatch({ type: USER_LOGOUT });
        navigate("/login");
    };

    if (error) return null;

    return (
        <header className="sticky-top shadow-sm">
            <Navbar
                expand="lg"
                bg="white"
                data-bs-theme="white"
                className="p-3 border-bottom"
            >
                <Container fluid>
                    <Link
                        to="/"
                        className="navbar-brand fst-logo fs-4"
                        title="G L O R Y Z"
                    >
                        G L O R Y Z
                    </Link>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="shadow-none border-0"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/" title="Home">
                                Home
                            </NavLink>
                            <NavDropdown
                                title="Collections"
                                id="basic-nav-dropdown"
                                renderMenuOnMount={true}
                            >
                                <Link
                                    className="dropdown-item"
                                    to="/collections"
                                >
                                    All
                                </Link>
                                {categories &&
                                    categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            className="dropdown-item"
                                            to={`/collections/?category=${encodeURI(
                                                category.slug
                                            )}`}
                                            title={category.name}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                            </NavDropdown>
                            <NavLink
                                className="nav-link"
                                to="/about-us"
                                title="About Us"
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                className="nav-link"
                                to="/refund-policy"
                                title="Refund Policy"
                            >
                                RETURN POLICY
                            </NavLink>
                        </Nav>
                        <Nav className="align-items-lg-center">
                            <CartOffcanvas
                                value={cart}
                                title={"Shopping Cart"}
                            />
                            <SearchModel />
                            {user ? (
                                <>
                                    <UserInfo user={user} />
                                    <Nav.Link onClick={logOut} title="Log Out">
                                        <CiLogout size={25} />
                                    </Nav.Link>
                                </>
                            ) : (
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    title="Log In"
                                >
                                    <CiUser size={25} />
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
