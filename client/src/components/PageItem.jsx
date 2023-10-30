import { Pagination } from "react-bootstrap";

const PageItem = ({ value, active, onClick }) => {
    return (
        <Pagination.Item
            className={"page-link" + (active ? " active" : "")}
            onClick={onClick}
        >
            {value}
        </Pagination.Item>
    );
};

export default PageItem;
