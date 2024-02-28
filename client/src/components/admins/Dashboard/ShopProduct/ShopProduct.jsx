import "./ShopProduct.css";

const ShopProduct = ({ data }) => {
  return (
    <>
      {/* edit the table to be able to display the products data of the shop */}
      {data.map((item, index) => (
        <tr key={index}>
          {item.map((value, idx) => (
            <td key={idx}>{value}</td>
          ))}
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
