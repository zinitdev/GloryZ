import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Banner = ({ banners }) => {
    return (
        <Carousel fade interval={3000}>
            {banners.map((banner) => {
                return (
                    <Carousel.Item key={banner.id}>
                        <Link to={"/"}>
                            <Image
                                className="object-fit-cover d-block w-100"
                                src={banner.image}
                                alt={banner.title}
                            />
                        </Link>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default Banner;
