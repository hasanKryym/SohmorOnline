import "./ShopProduct.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ShopProduct = ({ data }) => {
  return (
    <>
      {/* edit the table to be able to display the products data of the shop */}
      {data.map((product, index) => (
        <tr className="shop_product" key={index}>
          <td>
            <img className="product_image" src={product.image} alt="" />
          </td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.offer}</td>
          <td>{product.rating}</td>
          {/* <td>
            <input type="text" name="" id="" />
          </td> */}

          <td>
            <div className="buttons_container">
              <button className="edit-btn">
                <FaEdit />
              </button>
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

export default ShopProduct;
