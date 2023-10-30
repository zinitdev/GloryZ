import BackToHome from "../components/BackToHome";

export default function Error() {
    return (
        <section className="container my-2">
            <div id="error-page" className="p-5">
                <h1 className="display-1">404</h1>
                <h3>Oops! This Page Could Not Be Found</h3>
                <p className="mb-4">
                    Sorry, an unexpected error has occurred 🙂
                </p>
                <BackToHome />
            </div>
        </section>
    );
}
