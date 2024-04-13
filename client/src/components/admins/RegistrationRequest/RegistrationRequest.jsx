import { useShop } from "../../../context/Shop/shops/ShopsContext";
import { registrationRequestStatus } from "../../../enum/shopEnum/registrationRequestEnum/shopRegistrationRequestEnum";
import "./RegistrationRequest.css";

const RegistrationRequest = ({ request }) => {
  const { _id, shopInfo, adminInfo } = request;
  const { addShop, changeShopRegistrationRequestStatus } = useShop();
  const handleAcceptRequest = async () => {
    const response = await addShop(shopInfo, adminInfo);
    if (response.success) {
      await changeShopRegistrationRequestStatus(
        _id,
        registrationRequestStatus.ACCEPTED
      );
    }
  };
  return (
    <>
      <article className="shop_registration-request">
        <img src={shopInfo.image} alt="" />
        <h4>Request ID:{_id}</h4>
        <p>
          shop Name: <span>{shopInfo.name}</span>
        </p>
        <p>
          admin Name: <span>{adminInfo.name}</span>
        </p>
        <p>
          admin email: <span>{adminInfo.email}</span>
        </p>

        <div className="btns_container">
          <button
            onClick={() => handleAcceptRequest()}
            className="custom-button accept"
          >
            Accept
          </button>
          <button
            onClick={async () => {
              await changeShopRegistrationRequestStatus(
                _id,
                registrationRequestStatus.REJECTED
              );
            }}
            className="custom-button reject"
          >
            Reject
          </button>
        </div>
      </article>
    </>
  );
};

export default RegistrationRequest;
