import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserInfo = ({ user }) => {
    return (
        <>
            <Link
                className="nav-link"
                to={`/profile/${encodeURI(user.username)}`}
            >
                <Avatar user={user} />
            </Link>
        </>
    );
};

export default UserInfo;
