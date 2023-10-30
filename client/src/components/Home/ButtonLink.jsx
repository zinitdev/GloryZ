import { Link } from "react-router-dom";

const ButtonLink = ({ className, to, text }) => {
    return (
        <Link className={className} to={to}>
            {text}
        </Link>
    );
};

export default ButtonLink;
