import "./ShopProduct.css";

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
          <td>
            <input type="text" name="" id="" />
          </td>

          <td>
            {/* Add edit, delete, or add buttons */}
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
            <button className="add-btn">Add</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ShopProduct;
