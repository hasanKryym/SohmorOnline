import { useState } from "react";
import { useProduct } from "../../../../context/Shop/Products/ProductsContext";
import ProductForm from "../../ProductForm/ProductForm";
import "./ShopProduct.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ShopProduct = ({ data }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [clickedProduct, setClickedProduct] = useState({});
  const { deleteProductsById } = useProduct();

  const closeProductForm = () => {
    setShowProductForm(false);
  };

  return (
    <>
      {/* edit the table to be able to display the products data of the shop */}
      {data.map((product, index) => (
        <tr className="shop_product" key={product._id}>
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
              <button
                className="edit-btn"
                onClick={() => {
                  setShowProductForm(true);
                  setClickedProduct(product);
                }}
              >
                <FaEdit />
              </button>
              <button className="delete-btn">
                <FaTrashAlt onClick={() => deleteProductsById([product._id])} />
              </button>
            </div>
          </td>
        </tr>
      ))}
      {showProductForm && (
        <ProductForm
          clostProductForm={closeProductForm}
          product={clickedProduct}
        />
      )}
    </>
  );
};

export default ShopProduct;
