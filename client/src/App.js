import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import RootLayout from "./layouts/RootLayout";
import routers from "./routes/routers";
import UserContext from "./utils/context/UserContext";
import cookie from "react-cookies";
import { useReducer } from "react";
import UserReducer from "./redux/reducers/UserReducer";

export default function App() {
    let current = cookie.load("current-user");
    if (current === undefined) current = null;

    const [user, dispatch] = useReducer(UserReducer, current);

    return (
        <Router>
            <UserContext.Provider value={[user, dispatch]}>
                <Routes>
                    <Route element={<RootLayout />}>
                        {routers.map((router, index) => {
                            const Page = router.component;
                            return (
                                <Route
                                    key={index}
                                    path={router.path}
                                    element={<Page />}
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}
