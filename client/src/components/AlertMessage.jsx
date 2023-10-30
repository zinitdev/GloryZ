import { Alert } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";

const AlertMessage = ({ text, state }) => {
    return (
        <Alert variant={state} className="text-center my-3">
            <CiShoppingCart size={70}/>
            <p>{text}</p>
        </Alert>
    );
};

export default AlertMessage;
