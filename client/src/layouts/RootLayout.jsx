import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "react-scroll-to-top";

const RootLayout = ({ children }) => {
    return (
        <>
            <ScrollToTop smooth top={80} width={20} height={20} />
            <Header />
            <main className="container-fluid p-0">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootLayout;
