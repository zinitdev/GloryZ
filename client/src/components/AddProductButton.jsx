import { Button } from "react-bootstrap";

const AddProductButton = ({ cartAddButtonHandler }) => {
    return (
        <Button onClick={cartAddButtonHandler} variant="primary" type="submit">
            Add to Shopping Cart
        </Button>
    );
};

export default AddProductButton;
