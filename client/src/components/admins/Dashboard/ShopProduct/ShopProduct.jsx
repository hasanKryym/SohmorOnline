import { useState } from "react";
import { useProduct } from "../../../../context/Shop/Products/ProductsContext";
import ProductForm from "../../ProductForm/ProductForm";
import "./ShopProduct.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import PopupNotification from "../../../PopupNotification/PopupNotification";

const ShopProduct = ({ data }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [clickedProduct, setClickedProduct] = useState({});
  const [productstoDelete, setProductsToDelete] = useState([]);
  const { deleteProductsById } = useProduct();

  const closeProductForm = () => {
    setShowProductForm(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* edit the table to be able to display the products data of the shop */}
      {data.map((product, index) => (
        <tr className="shop_product" key={product._id}>
          <td>
            <img
              className="product_image"
              src={product.image + "-/quality/lightest/-/progressive/yes/"}
              alt=""
            />
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
                {/* <FaTrashAlt onClick={() => deleteProductsById([product._id])} /> */}
                <FaTrashAlt
                  onClick={() => {
                    setProductsToDelete([product._id]);
                    setShowPopup(true);
                  }}
                />
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

      {showPopup && (
        <PopupNotification
          message="Are you sure you want to delete this product?"
          onConfirm={() => {
            deleteProductsById(productstoDelete);
            handleCancelDelete();
          }}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ShopProduct;
