import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
  return (
    <div className="relative">
    <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/61ldsgsHCvL._SX3000_.jpg"
            alt="image-1"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/61wfiCSxjDL._SX3000_.jpg"
            alt="image-2"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/61JEtkkHx9L._SX3000_.jpg"
            alt="image-3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
