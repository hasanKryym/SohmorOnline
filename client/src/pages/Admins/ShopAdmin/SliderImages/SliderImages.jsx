import { useEffect, useState } from "react";
import "./SliderImages.css";
import AddImage from "../../../../components/UploadCare/UploadCare";
import Navbar from "../../Navbar/Navbar";
import { navbarLinks } from "../../../../enum/linksEnum/shopAdminLinks";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import { useUser } from "../../../../context/User/UserContext";
import Slider from "../../../Home/HomeSlider/Slider";

const SliderImages = () => {
  const { shop, editShop, setShopQueryParams } = useShop();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    image: "",
  });

  useEffect(() => {
    setShopQueryParams((prevState) => ({
      ...prevState,
      shopId: user.data.role.shop,
    }));
  }, []);

  useEffect(() => {
    (async () => {
      if (!formData.image || !shop.name) return;
      await editShop({
        ...shop,
        sliderImages: [...shop.sliderImages, formData.image],
      });
      window.location.reload();
    })();
  }, [formData]);

  const deleteImage = (linkToRemove) => {
    const filteredLinks = shop.sliderImages.filter(
      (link) => link !== linkToRemove
    );
    editShop({ ...shop, sliderImages: filteredLinks });
  };
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div className="title_container">image slider</div>
      <div style={{ paddingBottom: "4rem" }}>
        <div
          className="middle"
          style={{ display: "flex", gap: "1rem", padding: "2rem " }}
        >
          Add new Slider Image (NOTE: these images will appear to users on your
          shop page): <AddImage setFormData={setFormData} />
        </div>

        <div className="images_container">
          {shop?.sliderImages &&
            shop?.sliderImages.map((link) => {
              return (
                <div className="slider_img">
                  <img src={link} alt="" />
                  <button
                    onClick={() => deleteImage(link)}
                    className="secondary-button"
                  >
                    delete
                  </button>
                </div>
              );
            })}
        </div>

        {/* <Slider images={shop?.sliderImages ?? []} /> */}
      </div>
    </>
  );
};

export default SliderImages;
