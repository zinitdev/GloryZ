import { Link } from "react-router-dom";

const BackToHome = () => {
    return (
        <Link to="/" className="text-primary border border-3 border-primary p-3">
            Back to Home
        </Link>
    );
};

export default BackToHome;
