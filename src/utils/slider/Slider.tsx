// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Css
import "./Slider.css";
import { Key } from "react";
type SliderProps = {
  images: string[];
};
const Slider = ({ images }:SliderProps) => {
  console.log('hello');
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((img: string | undefined, index: Key | null | undefined) => (
          <SwiperSlide key={index}>
            <img src={img} className="" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;