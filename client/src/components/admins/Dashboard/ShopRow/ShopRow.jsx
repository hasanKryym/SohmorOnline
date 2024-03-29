import "./ShopRow.css";
import { FaTrashAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useShop } from "../../../../context/Shop/shops/ShopsContext";
const ShopRow = ({ data }) => {
  const { deleteShop } = useShop();
  return (
    <>
      {/* edit the table to be able to display the products data of the shop */}
      {data.map((shop, index) => (
        <tr className="shop_row" key={shop._id}>
          <td>
            <img className="shop_image" src={shop.image} alt="" />
          </td>
          <td>{shop.name}</td>
          <td>{shop.description}</td>
          <td>{shop.address}</td>
          <td>{shop.phoneNumber}</td>
          <td>{shop.rating}</td>

          <td>
            <div className="buttons_container">
              <button className="edit-btn">
                <GrUserAdmin />
              </button>
              <button className="delete-btn">
                <FaTrashAlt onClick={() => deleteShop(shop._id)} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ShopRow;
