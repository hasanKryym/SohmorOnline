// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Slider.css";

// import required modules
import { Pagination } from "swiper/modules";
import ShopItem from "../ShopItem/ShopItem";

const Slider = ({ items }) => {
  return (
    <>
      <div className="itmes_slider">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <ShopItem item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
