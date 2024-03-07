import "./ShopRow.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const ShopRow = ({ data }) => {
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
          {/* <td>
            <input type="text" name="" id="" />
          </td> */}

          <td>
            <div className="buttons_container">
              <button className="delete-btn">
                <FaTrashAlt />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ShopRow;
