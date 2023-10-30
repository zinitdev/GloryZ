import avatarUser from "../assets/images/avatarUser.png";

const Avatar = ({ user, size = 50 }) => {
    if (user.avatar === null) {
        user.avatar = avatarUser;
    }

    return (
        <img
            alt={user.name}
            src={user.avatar}
            width={size}
            height={size}
            className="img-thumbnail rounded-circle"
            title={user.username}
        />
    );
};

export default Avatar;
