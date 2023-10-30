import { Button } from "react-bootstrap";

const RemoveProductButton = ({ cartRemoveButtonHandler, product }) => {
    return (
        <Button
            onClick={() => cartRemoveButtonHandler(product.id)}
            variant="outline-danger"
            type="submit"
        >
            Remove to Cart
        </Button>
    );
};

export default RemoveProductButton;
