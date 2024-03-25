import { useEffect, useState } from "react";
import "./SliderImages.css";
import AddImage from "../../../../components/UploadCare/UploadCare";
import Navbar from "../../Navbar/Navbar";
import { navbarLinks } from "../../../../enum/linksEnum/shopAdminLinks";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
import { useUser } from "../../../../context/User/UserContext";
import Slider from "../../../Home/HomeSlider/Slider";

const SliderImages = () => {
  const { shop, editShop, get_shops } = useShop();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    image: "",
  });

  useEffect(() => {
    if (!shop.name) get_shops(user.data.role.shop);
  }, []);

  useEffect(() => {
    if (!formData.image || !shop) return;
    editShop({ ...shop, sliderImages: [...shop.sliderImages, formData.image] });
  }, [formData]);
  return (
    <>
      <Navbar navbarLinks={navbarLinks} />
      <div
        className="middle"
        style={{ display: "flex", gap: "1rem", padding: "2rem " }}
      >
        Add new Slider Image: <AddImage setFormData={setFormData} />
      </div>
      <Slider images={shop?.sliderImages ?? []} />
    </>
  );
};

export default SliderImages;
