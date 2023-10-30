import cookie from "react-cookies";
import requestAPI from "../../api/API";
import { USER_LOGIN_REQUEST, USER_LOGOUT } from "../constants/constants";

const UserReducer = (state, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return action.payload;
        case USER_LOGOUT:
            cookie.remove("token");
            cookie.remove("current-user");
            requestAPI.defaults.headers["Authorization"] = null;
            return null;
        default:
            return state;
    }
};

export default UserReducer;
