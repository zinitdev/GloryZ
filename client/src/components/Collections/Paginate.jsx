import { Pagination } from "react-bootstrap";

const Paginate = ({ page, totalItems, pageSize, onChangePage }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => onChangePage(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination className="justify-content-center my-2 text-primary">
            {totalPages > 1 && items}
        </Pagination>
    );
};

export default Paginate;
