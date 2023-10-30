import { Button } from "react-bootstrap";
import { CiGift } from "react-icons/ci";

const BuyNowButton = () => {
    return (
        <Button variant="outline-primary" type="submit">
            Send It As A <CiGift size={20}/> Gift
        </Button>
    );
};

export default BuyNowButton;
