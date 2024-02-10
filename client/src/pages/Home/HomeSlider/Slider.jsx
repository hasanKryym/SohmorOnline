// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

import image1 from "../../../assets/images/homePage/homeSlider1.jpg";
import shopbag from "../../../assets/images/homePage/shopbag.jpg";

const Slider = () => {
  return (
    <>
      <div className="swiper_container">
        <Swiper
          style={{
            "--swiper-pagination-color": "#373234",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "8px",
            // "--swiper-pagination-bullet-horizontal-gap": "2px",
          }}
          className="swiper"
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img src={image1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={shopbag} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
